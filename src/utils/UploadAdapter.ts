import {
	UploadAdapter,
	FileLoader,
} from "@ckeditor/ckeditor5-upload/src/filerepository";
import axios from "axios";
import { HOST } from "./constants";

export function uploadAdapter(loader: FileLoader): UploadAdapter {
	return {
		upload: () => {
			return new Promise((resolve, reject) => {
				(async () => {
					const file = await loader.file;
					const response = await axios.request({
						method: "POST",
						url: `${HOST}/upload_files`,
						data: {
							files: file,
						},
						headers: {
							"Content-Type": "multipart/form-data",
						},
					});
					resolve({
						default: `${HOST}/${response.data.filename}`,
					});

				})();
			});
		},

	};
}