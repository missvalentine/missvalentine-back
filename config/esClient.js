var elasticsearch = require('elasticsearch');
const esClient = new elasticsearch.Client({
  hosts: 'http://localhost:9200',
  log: 'trace',
});
esClient.ping(
  {
    requestTimeout: 30000,
  },
  function (error) {
    if (error) {
      console.error('elasticsearch cluster is down!');
    } else {
      console.log('elasticsearch cluster connected...'.pink.bold);
    }
  }
);
module.exports = esClient;
