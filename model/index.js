const db = require('../config/database');

db.user         = require('./user.model')(db.sequelize, db.Sequelize);
db.roleUser     = require('./role-user.model')(db.sequelize, db.Sequelize);
db.fitures      = require('./fitures.model')(db.sequelize, db.Sequelize);
db.category     = require('./categories.model')(db.sequelize, db.Sequelize);
db.product      = require('./products.model')(db.sequelize, db.Sequelize);
db.setup_pages  = require('./setup_pages.model')(db.sequelize, db.Sequelize);
db.satuan       = require('./satuan.model')(db.sequelize, db.Sequelize);
db.tipe         = require('./jenis-pejualan.model')(db.sequelize, db.Sequelize);
db.image        = require('./image.model')(db.sequelize, db.Sequelize);

db.product.hasMany(db.image, {
    foreignKey: 'product',
});

db.category.hasMany(db.product, {
    foreignKey: 'category'
});

// db.product.belongsToMany(db.category, {
//     foreignKey: 'id_category',
//   })

module.exports = db;