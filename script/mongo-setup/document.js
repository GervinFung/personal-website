#!/usr/bin/sh

db = db.getSiblingDB('admin');

db.createUser({
	user: 'runner',
	pwd: 'mongodb',
	roles: [{ role: 'root', db: 'admin' }, 'readWrite'],
});

db.auth('runner', 'mongodb');

db = db.getSiblingDB('my-web');
db.createCollection('contact-form-message');

db = db.getSiblingDB('test-my-web');
db.createCollection('contact-form-message');
