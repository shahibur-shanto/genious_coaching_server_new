import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import app from "./app";
const port: number = 5000;

// const uri = `mongodb+srv://Shanto:2gC1R6LQbbKGSiWu@cluster0.qxopl.mongodb.net/MyCoaching?retryWrites=true&w=majority`;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qxopl.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// const client = new MongoClient(uri, {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// });

async function database() {
	try {
		await mongoose.connect(uri);
		console.log("database connect successfully");
		app.listen(port, () => {
			console.log(`Server is listening on port ${port}`);
		});
	} catch (err) {
		console.log("Error connection database: ", err);
		process.exit(1);
	}
}
database();

// app.get("/bookingList", (req, res) => {
// 	bookCollection.find({ email: req.query.email }).toArray((err, documents) => {
// 		res.send(documents);
// 	});
// });
