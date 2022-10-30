const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('blogs', 'year_written', {
      type: DataTypes.INTEGER,
      validate: {
        allowNull: true,
        isAfter: "1990"
      }
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('blogs', 'year_written')
  },
}