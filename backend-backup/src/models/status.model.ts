import { model, Schema } from 'mongoose';
import { IOrderStatus } from '../interface/status.interface';
import { COLLECTION_DOCUMENT_NAME, COLLECTION_NAME_CONST } from '../utils/constants';

const statusSchema = new Schema<IOrderStatus>({
   code: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    color: {
        type: String,
        default: '#000000'
    },
    order: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDefault: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME_CONST.STATUS
});

export const statusModel = model<IOrderStatus>(COLLECTION_DOCUMENT_NAME.STATUS, statusSchema);