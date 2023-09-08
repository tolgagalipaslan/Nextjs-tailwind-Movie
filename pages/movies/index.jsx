import { Collapse, Divider, Select, Space } from "antd";
import React from "react";

const Movies = () => {
  return (
    <div className="container pb-10">
      <div className="filters w-1/4 flex flex-col gap-3">
        <Collapse
          className="select-none bg-mainBlack2 border-none shadow-none "
          items={[
            {
              key: "1",
              label: "Sort",
              children: (
                <div className="flex flex-col gap-2">
                  Sort Results By
                  <Select
                    defaultValue="Popularity Descending"
                    options={[
                      {
                        value: "Popularity Descending",
                        label: "Popularity Descending",
                      },
                      {
                        value: "Rating Descending",
                        label: "Rating Descending",
                      },
                      {
                        value: "Realse Date Descending",
                        label: "Realse Date Descending",
                      },
                      {
                        value: "a-z",
                        label: "Title (A-Z)",
                      },
                    ]}
                  />
                </div>
              ),
            },
          ]}
        />

        <Collapse
          className="select-none bg-mainBlack2 border-none shadow-none "
          items={[
            {
              key: "1",
              label: "Filters",
              children: (
                <div className="flex flex-col gap-2 relative">
                  Sort Results By
                  <Select
                    defaultValue="Popularity Descending"
                    options={[
                      {
                        value: "Popularity Descending",
                        label: "Popularity Descending",
                      },
                      {
                        value: "Rating Descending",
                        label: "Rating Descending",
                      },
                      {
                        value: "Realse Date Descending",
                        label: "Realse Date Descending",
                      },
                      {
                        value: "a-z",
                        label: "Title (A-Z)",
                      },
                    ]}
                  />
                  <div className="relative pt-5">Text</div>
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Movies;
