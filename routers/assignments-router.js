import { Router } from "express";
import Model from "../model/Model.js";
import assignmentsModel from "../model/assignments-model.js";
import Accessor from "../accessor/Accessor.js";
import database from "../database.js";
import Controller from "../controller/Controller.js";

const model = new Model(assignmentsModel);
const accessor = new Accessor(model,database)
const controller = new Controller(accessor);

const router = Router();
//Endpoints
router.get('/:id', (req, res) => controller.get(req, res, 'assignment'));
router.get('/:id/:mid', (req, res) => controller.get(req, res, 'modulesAssignments'));
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);

export default router;