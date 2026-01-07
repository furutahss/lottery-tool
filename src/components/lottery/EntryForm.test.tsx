import { render, screen, fireEvent } from '@testing-library/react';
import { EntryForm } from './EntryForm';
import { describe, it, expect, vi } from 'vitest';

describe('EntryForm Component', () => {
  it('入力がない場合にボタンが非活性であること', () => {
    render(<EntryForm onStart={vi.fn()} />);
    const button = screen.getByRole('button', { name: /抽選ページへ進む/i });
    expect(button).toBeDisabled();
  });

  it('IDと人数を入力して送信すると onStart が呼ばれること', () => {
    const onStartMock = vi.fn();
    render(<EntryForm onStart={onStartMock} />);

    const textarea = screen.getByPlaceholderText(/user_id_1/i);
    const inputCount = screen.getByLabelText(/当選人数/i);
    const button = screen.getByRole('button', { name: /抽選ページへ進む/i });

    // IDを入力
    fireEvent.change(textarea, { target: { value: 'test1, test2, test3' } });
    // 当選人数を入力
    fireEvent.change(inputCount, { target: { value: '2' } });

    fireEvent.click(button);

    expect(onStartMock).toHaveBeenCalledWith(['test1', 'test2', 'test3'], 2);
  });

  it('参加者数より当選人数が多い場合に警告を出すこと', () => {
    // window.alertをモック化
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
    const onStartMock = vi.fn();
    
    render(<EntryForm onStart={onStartMock} />);
    
    const textarea = screen.getByPlaceholderText(/user_id_1/i);
    const inputCount = screen.getByLabelText(/当選人数/i);
    const button = screen.getByRole('button', { name: /抽選ページへ進む/i });

    fireEvent.change(textarea, { target: { value: 'user1' } });
    fireEvent.change(inputCount, { target: { value: '5' } });
    fireEvent.click(button);

    expect(alertMock).toHaveBeenCalled();
    expect(onStartMock).not.toHaveBeenCalled();
    
    alertMock.mockRestore();
  });
});