const path = require("path");

module.exports = {
  entry: {
    'patient/create-patient': './src/functions/patient/create-patient/create-patient.ts',
    'patient/get-patient-by-id': './src/functions/patient/get-patient-by-id/get-patient-by-id.ts',
    'patient/search-patient-by-name': './src/functions/patient/search-patient-by-name/search-patient-by-name.ts',
    'patient/get-all-patients': './src/functions/patient/get-all-patients/get-all-patients.ts',
    'patient/update-patient': './src/functions/patient/update-patient/update-patient.ts',
    'investigation/get-investigation-by-id': './src/functions/investigation/get-investigation-by-id/get-investigation-by-id.ts',
    'doctor/create-doctor': './src/functions/doctor/create-doctor/create-doctor.ts',
    'doctor/get-doctor-by-id': './src/functions/doctor/get-doctor-by-id/get-doctor-by-id.ts',
    'doctor/get-all-doctors': './src/functions/doctor/get-all-doctors/get-all-doctors.ts',
    'doctor/update-doctor': './src/functions/doctor/update-doctor/update-doctor.ts',
    'investigation-register/add-investigation-registration': './src/functions/investigation-register/add-investigation-registration/add-investigation-registration.ts',
    'investigation-register/update-investigation-registration': './src/functions/investigation-register/update-investigation-registration/update-investigation-registration.ts',
    'investigation-register/get-all-investigation-registrations': './src/functions/investigation-register/get-all-investigation-registrations/get-all-investigation-registrations.ts',
    'investigation-data/add-investigation-data': './src/functions/investigation-data/add-investigation-data/add-investigation-data.ts',
    'investigation-data/get-investigation-data': './src/functions/investigation-data/get-investigation-data/get-investigation-data.ts',
    'investigation-data/update-investigation-data': './src/functions/investigation-data/update-investigation-data/update-investigation-data.ts',
    'audit-trail/get-all-audit-trail-records': './src/functions/audit-trail/get-all-audit-trail-records/get-all-audit-trail-records.ts',
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
