import logdna from "@logdna/browser";

const metadata = {
  environment: process.env.NODE_ENV,
  version: process.env.REACT_APP_VERSION,
  _dataSource: "frontend", // to categorize logs on the dashboard
};

// configure logdna only when the application is running in production/stage
if ("development" !== process.env.NODE_ENV) {
  logdna.init(process.env.REACT_APP_LOGDNA_INGESTION_KEY).addContext(metadata);
}
