import express from 'express';
import { Organization } from '../models/OrgDetails.js';

const router =  express.Router();

router.get('/', async (request, response) => {
    try {
        const organization = await Organization.find({});
        return response.status(200).json({
            count: organization.length,
            data: organization
        });
    }
    catch (error){ 
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
});

//Route for getting one organization by id
router.get('/:id', async (request, response) => {
    try {

        const {id} = request.params;

        const organization = await Organization.findById(id);
        return response.status(200).json(organization);
    }
    catch (error){ 
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
});


//Route for updating an organization by id
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.name ||
            !request.body.type ||
            !request.body.numberOfLevels ||
            !request.body.roles
        ) {
            return response.status(400).send({
                message: 'Send all required fields: name, type, numberOfLevels, and roles'
            });
        }
        const {id} = request.params;
        const result = await Organization.findByIdAndUpdate(id, request.body);

        if(!result) {
            return response.status(404).json({message: 'Organization not found'});
        }
     
        return response.status(200).send({message: 'Organization Updated succesfully'});
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


//Route for deleting an organization
router.delete('/:id', async (request, response) => {
    try {
        const {id} = request.params;
        const result = await Organization.findByIdAndDelete(id);
        if(!result) {
            return response.status(404).json({message: 'Organization not found'});
        }
        return response.status(200).send({message: 'Organization deleted successfully'});
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
});

//Route for saving a new organization
router.post('/', async (request, response) => {
    try {
        // Extract organization data from request body
        const { name, type, numberOfLevels, roles } = request.body;

        // Validate required fields
        if (!request.body.name || !request.body.type || !request.body.numberOfLevels || !request.body.roles) {
            return response.status(400).send({
                message: 'Send all required fields: name, type, numberOfLevels, and roles'
            });
        }

        // Create new organization object
        const newOrganization = new Organization({
            name: request.body.name,
            type: request.body.type,
            numberOfLevels: request.body.numberOfLevels,
            roles: request.body.roles
        });

        // Save organization to the database
        //await newOrganization.save();
        const organization = await Organization.create(newOrganization);

        return response.status(201).send(newOrganization);
    } catch (error) {
        console.error('Error saving organization:', error);
        return response.status(500).send({ message: 'Internal server error' });
    }
});

export default router;