import { contactList } from "../api/public";
function sleep(time) {
  setTimeout(() => {}, time);
}
export const demoSrc =
  "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60";

export async function mockUpload(file) {
  let formData = new FormData();
  formData.append("file", file);
  let { data } = await contactList(formData);
  return {
    url: data,
  };
}

export async function mockUploadFail() {
  await sleep(3000);
  throw new Error("Fail to upload");
}
