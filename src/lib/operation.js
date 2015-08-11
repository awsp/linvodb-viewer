var LinvoDB = require("linvodb3");
LinvoDB.defaults.store = {db: require("medeadown")};

var operation = {
  instance: null,

  currentDir: null,

  currentDb: null,

  currentWebix: null,

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
        header: operation.formatEntity(col),
        sort: operation.guessDataType(col)
      });
    }
    return schemaData;
  },

  guessDataType: function (input) {
    if (isNaN(parseInt(input, 10))) {
      return 'string';
    }
    else if (!parseInt(input, 10) || !parseFloat(input)) {
      return 'int';
    }
  },

  reloadDoc: function () {
    if (operation.currentDir && operation.currentDb, operation.currentWebix) {
      console.log(operation.currentDir);
      operation.loadDoc(operation.currentDir, operation.currentDb, operation.currentWebix);
    }
  },

  loadDoc: function (fileDir, db, webixInstance) {
    // Save current settings for reloading
    operation.currentDir = fileDir;
    operation.currentDb = db;
    operation.currentWebix = webixInstance;

    operation.loadDb(db, fileDir, function (Doc) {
      Doc.find({}, function (err, docs) {
        if (docs.length > 0) {
          var schema = operation.getSchema(docs[0]);
          $("#drop-notice").hide();

          if (operation.instance) {
            operation.instance.destructor();
          }

          operation.instance = new webixInstance.ui({
            id: "datatable",
            container: "datatable",
            view: "datatable",
            columns: schema,
            width: window.innerWidth,
            height: window.innerHeight,
            columnWidth: 200,
            data: docs,
            select: 'row',
            resizeColumn: true
          });
        }
      });
    });
  }
};


module.exports = operation;