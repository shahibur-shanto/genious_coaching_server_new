import express, { Application, Request, Response, urlencoded } from "express";
import cors from "cors";
import mongoose, { Schema, model, connect } from "mongoose";

const app: Application = express();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qxopl.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
// using cors
app.use(cors());

//parse data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
	res.send("Hello World!");
});

app.get("/bookingList", async (req, res) => {
	try {
		// await mongoose.connect(uri);
		// if (!req.query.email) {
		// 	throw new Error("Email parameter is missing");
		// }
		const bookCollection = mongoose.connection.collection("booking");
		const documents = await bookCollection
			.find({ email: "shahibur407@gmail.com" })
			.toArray();
		res.send(documents);
	} catch (error) {
		console.error("Error fetching booking list:", error.message);
		res.status(500).send("Internal Server Error");
	}
});

app.get("/reviews", async (req, res) => {
	try {
		const reviewCollection = mongoose.connection.collection("review");
		const documents = await reviewCollection.find({}).toArray();
		res.send(documents);
	} catch (err) {
		console.log("Error fetching booking list:", err.message);
		res.status(500).send("Internal server error");
	}
});

// app.post("/user", (req: Request, res: Response) => {
// 	interface IUser {
//         name: string;
//         email: string;
//         avatar?: string;
//     }

//     const userSchema = new Schema<IUser>({
//         name: { type: String, required: true },
//         email: { type: String, required: true },
//         avatar: String
//     });
//     const User = model<IUser>('User', userSchema);

//     const createUsertoDB = async () => {
//         await connect('mongodb://127.0.0.1:27017/test');

//         const user = new User({
//           name: 'Bill',
//           email: 'bill@initech.com',
//           avatar: 'https://i.imgur.com/dM7Thhn.png'
//         });
//         await user.save()
//     }
//     createUsertoDB();
// 	// res.send("Hello World!");
// });

export default app;
