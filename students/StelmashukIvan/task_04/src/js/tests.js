import { memesAPI } from './api.js';

async function testCreateItem() {
    const testData = {
        title: 'Test Meme',
        description: 'Test Description',
        image: 'https://test.com/image.jpg',
        tags: ['test', 'meme']
    };
    try {
        const { data } = await memesAPI.createItem(testData);
        console.assert(data.title === testData.title, 'Create: Title mismatch');
        console.assert(data.description === testData.description, 'Create: Description mismatch');
        console.log('Create test passed');
        return data.id;
    } catch (err) {
        console.error('Create test failed:', err);
    }
}

async function testGetItem(id) {
    try {
        const { data } = await memesAPI.getItem(id);
        console.assert(data.id === id, 'Get: ID mismatch');
        console.log('Get test passed');
    } catch (err) {
        console.error('Get test failed:', err);
    }
}

async function testUpdateItem(id) {
    const updateData = {
        title: 'Updated Meme',
        description: 'Updated Description'
    };
    try {
        const { data } = await memesAPI.updateItem(id, updateData);
        console.assert(data.title === updateData.title, 'Update: Title mismatch');
        console.log('Update test passed');
    } catch (err) {
        console.error('Update test failed:', err);
    }
}

async function testDeleteItem(id) {
    try {
        await memesAPI.deleteItem(id);
        console.log('Delete test passed');
    } catch (err) {
        console.error('Delete test failed:', err);
    }
}

async function runAllTests() {
    const id = await testCreateItem();
    if (id) {
        await testGetItem(id);
        await testUpdateItem(id);
        await testDeleteItem(id);
    }
}