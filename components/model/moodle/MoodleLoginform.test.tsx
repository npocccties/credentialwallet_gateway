import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { MoodleLoginForm } from "./MoodleLoginform";

describe("<MoodleLoginForm /> unit test", () => {
  const mockSetIsNeedMoodleLogin = jest.fn();
  const mockGetMyBadges = jest.fn();

  beforeEach(() => {
    render(<MoodleLoginForm setIsNeedMoodleLogin={mockSetIsNeedMoodleLogin} getMyBadges={mockGetMyBadges} />);
  });

  test("MoodleLoginFormコンポーネントが正常にレンダリングされる", () => {
    expect(screen.getByText("Moodleに登録されているユーザー名とパスワードを入力してください")).toBeInTheDocument();
  });

  test("「バッジ一覧取得」押下時にgetMyBadges関数が実行される", async () => {
    fireEvent.change(screen.getByLabelText(/ユーザー名/i), { target: { value: "testuser" } });
    fireEvent.change(screen.getByLabelText(/パスワード/i), { target: { value: "password123" } });
    fireEvent.click(screen.getByRole("button", { name: /バッジ一覧取得/i }));

    await waitFor(() => {
      expect(mockGetMyBadges).toHaveBeenCalledWith("testuser", "password123");
    });
  });
});
