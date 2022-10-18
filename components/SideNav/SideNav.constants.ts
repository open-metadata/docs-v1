const quickStartMenu = [
  {
    name: "Local Docker Deployment",
    href: "/quick-start/local-deployment",
    children: [
      {
        name: "Osx",
        href: "/quick-start/local-deployment/osx",
      },
      {
        name: "Linux",
        href: "/quick-start/local-deployment/linux",
      },
      {
        name: "Windows",
        href: "/quick-start/local-deployment/windows",
      },
    ],
  },
];

const connectorsMenu = [
  {
    name: "Database",
    href: "/connectors/database",
    children: [
      {
        name: "SnowFlake",
        href: "/connectors/database/snowflake",
        children: [
          {
            name: "Airflow",
            href: "/connectors/database/snowflake/airflow",
          },
          {
            name: "CLI",
            href: "/connectors/database/snowflake/cli",
          },
        ],
      },
      {
        name: "RedShift",
        href: "/connectors/database/redshift",
        children: [
          {
            name: "Airflow",
            href: "/connectors/database/redshift/airflow",
          },
          {
            name: "CLI",
            href: "/connectors/database/redshift/cli",
          },
        ],
      },
    ],
  },
];

export const getMenuItems = (page: string) => {
  switch (page) {
    case "quick-start":
      return quickStartMenu;
    case "connectors":
      return connectorsMenu;
  }
};
