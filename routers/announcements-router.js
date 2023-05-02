import { Router } from "express";
import database from '../database.js';
import Model from "../model/Model.js";
import announcementsModel from '../model/announcements-model.js';
import Accessor from "../accessor/Accessor.js";
import Controller from "../controller/Controller.js";

 const model = new Model(announcementsModel);
 const accessor = new Accessor(model,database);
 const controller = new Controller(accessor);

const router = Router();
//Endpoints
router.get('/:id', (req, res) => controller.get(req, res,'announcement'));
router.get('/:id/mid', (req, res) => controller.get(req, res, 'moduleAnnouncements'));
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);

export default router;