const request = require("supertest");
const app = require("../server.js");
const { Post } = require("../src/model/Post.js");

describe("API endpoints", () => {
	beforeEach((done) => {
		Post.deleteMany({})
			.then(() => done())
			.catch((err) => done(err));
	});

	afterEach((done) => {
		Post.deleteMany({})
			.then(() => done())
			.catch((err) => done(err));
	});

	// test for GET /api/all endpoint
	it("GET /api/all should return all posts", () => {
		return request(app)
			.get("/api/all")
			.then((res) => {
				expect(res.status).toBe(200);
				expect(Array.isArray(res.body)).toBe(true);
			});
	});

	// test for POST /api/add endpoint with valid data
	it("POST /api/add should add a new post", () => {
		const newPost = {
			title: "Test Post",
			content: "This is a test post",
			noteStatus: "To Do",
		};

		return request(app)
			.post("/api/add")
			.send(newPost)
			.then((response) => {
				expect(response.status).toBe(201);
				expect(response.body).toHaveProperty("_id");
				expect(response.body.title).toBe(newPost.title);
			});
	});

	// test for POST /api/add endpoint with invalid title
	it("POST /api/add should return validation error for invalid data", () => {
		const invalidPost = {
			content: "This is a test post",
			noteStatus: "To Do",
		};

		return request(app)
			.post("/api/add")
			.send(invalidPost)
			.then((response) => {
				expect(response.status).toBe(400);
				expect(response.body).toHaveProperty("error");
				expect(response.body.error).toBe("Title cannot be empty");
			});
	});

	// test for POST /api/add endpoint with invalid note status
	it("POST /api/add should return validation error for invalid note status", () => {
		const invalidPost = {
			title: "Test Post",
			content: "This is a test post",
			noteStatus: "Invalid",
		};

		return request(app)
			.post("/api/add")
			.send(invalidPost)
			.then((response) => {
				expect(response.status).toBe(400);
				expect(response.body).toHaveProperty("error");
				expect(response.body.error).toBe("Invalid note status");
			});
	});

	// test for PUT /api/update/:id endpoint with valid data
	it("PUT /api/update/:id should update a post", () => {
		const post = new Post({
			title: "Test Post",
			content: "This is a test post",
			noteStatus: "To Do",
		});

		post.save().then((data) => {
			const updatedPost = {
				title: "Updated Test Post",
				content: "This is an updated test post",
			};

			return request(app)
				.put(`/api/update/${data._id}`)
				.send(updatedPost)
				.then((response) => {
					expect(response.status).toBe(200);
					expect(response.body).toHaveProperty("nModified");
					expect(response.body.nModified).toBe(1);
				});
		});
	});
});
