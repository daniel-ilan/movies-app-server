import { model, Schema } from "mongoose"
import { IMember } from "../types"

const membersSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
        },

        city: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
)

export default model<IMember>("Member", membersSchema, 'Members')