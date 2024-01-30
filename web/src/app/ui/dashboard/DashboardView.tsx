import React, { useEffect } from "react";
import { ChartThumbnail } from "./ChartThumbnail";
import { placeholderCharts } from "../charts/PlaceholderChartData";
import { trpc } from "../../utils/trpc";
import { DashboardStickyHeader } from "./DashboardStickyHeader";
import { DashboardNavigator } from "./DashboardNavigator";
import { HeaderNav } from "../HeaderNav";
import { useLastSelectedProjectBoardStore } from "../../../../stores/useLastSelectedProjectBoardStore";
import { ProjectBoardProvider } from "../../../../providers/ProjectBoardProvider";

interface DashboardViewProps {}
let charts = placeholderCharts;

export const DashboardView: React.FC<DashboardViewProps> = ({}) => {
  const currIds = useLastSelectedProjectBoardStore();
  const { data, isLoading } = trpc.getProjects.useQuery({
    currProjectId: currIds.lastProjectId,
  });

  if (isLoading) {
    return null;
  }

  if (!data?.boards) {
    return <div>no project or boards ?</div>;
  }

  const project = currIds.lastProjectId
    ? data.projects.find((p) => p.id === currIds.lastProjectId) ||
      data.projects[0]
    : data.projects[0];

  const board = currIds.lastBoardId
    ? data.boards.find((b) => b.id === currIds.lastBoardId) || data.boards[0]
    : data.boards[0];

  return (
    <ProjectBoardProvider projectId={project.id} boardId={board.id}>
      <div className="flex flex-row flex-1">
        <DashboardNavigator boards={data.boards} />
        <div className="flex-1 relative">
          <DashboardStickyHeader board={board} />
          <div>
            {/* Grid of charts */}
            <div className="grid text-center p-8 lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left">
              {charts.map((chart) => {
                return (
                  <div key={chart.title} className="m-2">
                    <ChartThumbnail
                      title={chart.title}
                      subtitle={chart.subtitle}
                      chartType={chart.chartType}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </ProjectBoardProvider>
  );
};
