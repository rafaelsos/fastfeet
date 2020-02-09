module.exports = {
  up: QueryInterface => {
    return QueryInterface.renameColumn('users', 'provider', 'admin');
  },

  down: () => {},
};
