const path = require("path");

module.exports = {
  entry: {
    'patient/create-patient': './src/functions/patient/create-patient/index.ts',
    'patient/get-patient-by-id': './src/functions/patient/get-patient-by-id/index.ts',
    'patient/get-all-patients': './src/functions/patient/get-all-patients/get-all-patients.ts',
    // 'doctor/create-doctor': './src/functions/doctor/create-doctor/index.ts',
    // 'doctor/get-doctor-by-id': './src/functions/doctor/get-doctor-by-id/index.ts',
    // 'investigation/get-all-investigations': './src/functions/investigation/get-all-investigations/index.ts',
    // 'investigation/get-investigation-by-id': './src/functions/investigation/get-investigation-by-id/index.ts',
  },
  target: 'node',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name]/index.js',
    path: path.resolve(__dirname, 'bundled'),
    libraryTarget: 'commonjs2',
  },
};
