import React from "react";
import { useLastSelectedProjectBoardStore } from "../../../../stores/useLastSelectedProjectBoardStore";
import { useProjectBoardContext } from "../../../../providers/ProjectBoardProvider";
import { RouterOutput } from "../../utils/trpc";
import { PiCaretLeftFill } from "react-icons/pi";
import config from "../../../../tailwind.config";

interface DashboardSidebarButtonProps {
  board: RouterOutput["getProjects"]["boards"][0];
}

const colors = config.theme.extend.colors;

export const DashboardSidebarButton: React.FC<DashboardSidebarButtonProps> = ({
  board,
}) => {
  const { set } = useLastSelectedProjectBoardStore();
  const { boardId } = useProjectBoardContext();
  const isSelectedBoard = board.id === boardId;
  const sidebarButtonStyle =
    "accent-hover ring-0 group flex p-2 rounded-lg w-full items-center relative ";
  const selectedBoardButtonStyle = "bg-primary-700 ring-primary-600/50 ";

  return (
    <button
      onClick={() => {
        set({ lastBoardId: board.id });
      }}
      key={board.id}
      className={
        (isSelectedBoard ? selectedBoardButtonStyle : " !border-transparent") +
        sidebarButtonStyle
      }
    >
      <div className="mr-2">{board.emoji}</div>
      {board.title}
      {boardId === board.id ? (
        <PiCaretLeftFill
          fill={colors.primary[900]}
          size={50}
          className="absolute"
          style={{ right: -30 }}
        />
      ) : null}
    </button>
  );
};