module.exports = {
  dialect: 'postgres',
  host: '192.168.99.100', // se for docker toolbox não é localhost é 198xxxx
  username: 'postgres',
  password: 'docker',
  database: 'fastfeet',
  define: {
    timestamps: true,
    underscoder: true,
    underscoderAll: true,
  },
};
