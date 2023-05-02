import { Router } from "express";
import database from '../database.js';
import Model from "../model/Model.js";
import homeworkModel from'../model/homework-model.js';
import Accessor from "../accessor/Accessor.js";
import Controller from "../controller/Controller.js"; 
const router = Router();

const model = new Model(homeworkModel);
const accessor = new Accessor(model,database)
const controller = new Controller(accessor);
//Endpoints
router.get('/:id', (req, res) => controller.get(req, res, 'homework'));
router.get('/:id/:mid', (req, res) => controller.get(req, res, 'moduleHomework'));
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);

export default router;


