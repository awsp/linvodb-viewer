var LinvoDB = require("linvodb3");
LinvoDB.defaults.store = { db: require("medeadown") };

var operation = {
  instance: null,

  getDbMeta: function (filePath) {
    var matches = filePath.match(/(.+)\/(.+)\.db$/);
    if (matches && matches.length === 3) {
      return {
        origin: matches[0],
        path: matches[1],
        db: matches[2]
      };
    }
    else {
      throw new Error('h');
    }
  },

  loadDb: function (dbEngine, filePath, callback) {
    dbEngine = dbEngine || LinvoDB;
    var metaData = operation.getDbMeta(filePath);
    LinvoDB.dbPath = metaData.path;
    var Doc = new LinvoDB(metaData.db, {});
    callback(Doc);
  },

  _schema: function (entity) {
    var schema = Object.keys(entity);
    return schema;
  },

  formatEntity: function (value) {
    return value[0].toUpperCase() + value.slice(1);
  },

  getSchema: function (entity) {
    var schema = operation._schema(entity);
    var schemaData = [];
    for (var i in schema) {
      var col = schema[i];
      schemaData.push({
        id: col,
        header: operation.formatEntity(col)
      });
    }
    return schemaData;
  }
};


module.exports = operation;