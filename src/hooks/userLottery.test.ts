import { renderHook, act } from '@testing-library/react';
import { useLottery } from './useLottery';
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

describe('useLottery Hook', () => {
  const mockIds = ['user1', 'user2', 'user3', 'user4', 'user5'];
  const winnerCount = 2;

  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('初期状態が正しいこと', () => {
    const { result } = renderHook(() => useLottery(mockIds, winnerCount));
    expect(result.current.status).toBe('idle');
    expect(result.current.winners).toHaveLength(0);
    expect(result.current.ids).toEqual(mockIds);
  });

  it('抽選開始後にステータスが shuffling になること', () => {
    const { result } = renderHook(() => useLottery(mockIds, winnerCount));
    act(() => {
      result.current.startLottery();
    });
    expect(result.current.status).toBe('shuffling');
  });

  it('一定時間後に抽選が完了し、指定した人数の当選者が選ばれること', () => {
    const { result } = renderHook(() => useLottery(mockIds, winnerCount));
    
    act(() => {
      result.current.startLottery();
    });

    // setInterval (100ms * 21回分) を進める
    act(() => {
      vi.advanceTimersByTime(2500);
    });

    expect(result.current.status).toBe('completed');
    expect(result.current.winners).toHaveLength(winnerCount);
    // 当選者が元のリストに含まれているか
    result.current.winners.forEach(winner => {
      expect(mockIds).toContain(winner);
    });
  });

  it('リセット時に初期状態に戻ること', () => {
    const { result } = renderHook(() => useLottery(mockIds, winnerCount));
    
    act(() => {
      result.current.startLottery();
      vi.advanceTimersByTime(2500);
    });
    
    expect(result.current.status).toBe('completed');

    act(() => {
      result.current.resetLottery();
    });

    expect(result.current.status).toBe('idle');
    expect(result.current.winners).toHaveLength(0);
  });
});