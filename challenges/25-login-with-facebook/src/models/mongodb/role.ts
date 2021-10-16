import {Schema, model} from "mongoose";
import {IRole} from "../../utils/modelsInterfaces";

const roleSchema = new Schema<IRole>({
  name: {type: String, required: true},
});

export const RoleModel = model<IRole>("Role", roleSchema);
