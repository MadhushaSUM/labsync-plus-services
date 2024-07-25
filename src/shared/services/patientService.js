"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPatient = addPatient;
const patient_1 = require("../models/patient");
const patientRepository_1 = require("../repositories/patientRepository");
function addPatient(patient) {
    return __awaiter(this, void 0, void 0, function* () {
        const addingPatient = (0, patient_1.validatePatient)(patient);
        return yield (0, patientRepository_1.savePatient)(addingPatient);
    });
}
