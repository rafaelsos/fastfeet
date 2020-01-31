module.exports = {
  dialect: 'postgres',
  host: 'localhost', // se for docker toolbox não é localhost é 198xxxx
  username: 'postgres',
  password: 'docker',
  database: 'fastfee',
  define: {
    timestamps: true,
    underscoder: true,
    underscoderAll: true,
  },
};
