import React, { useState, useContext } from "react";
import { storage, databases, ID } from "./appwrite";
import { AuthContext } from "./AuthContext";

function AppWriteUpload() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(AuthContext);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const isUploaded = await storage.createFile(
        process.env.REACT_APP_BUCKET_ID,
        ID.unique(),
        file
      );
      const uploadedDocId = isUploaded.$id;

      const createDoc = await databases.createDocument(
        process.env.REACT_APP_DATABASE_ID,
        process.env.REACT_APP_COLLECTION_ID,
        ID.unique(),
        {
          Title: title,
          Subject: subject,
          Content: uploadedDocId,
          Author: author,
          UploadDate: new Date().toISOString(),
          uploaderId: user.$id,
        }
      );
      console.log(createDoc);
      alert("Uploaded");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <link
        href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
        rel="stylesheet"
      />
      <div
        className="relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover relative items-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1621243804936-775306a8f2e3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)",
        }}
      >
        <div className="absolute bg-black opacity-60 inset-0 z-0" />
        <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">
          <div className="text-center">
            <h2 className="mt-5 text-3xl font-bold text-gray-900">
              File Upload!
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Please Upload appropriate file only!!
            </p>
          </div>
          <form
            className="mt-8 space-y-3"
            action="#"
            method="POST"
            onSubmit={handleUpload}
          >
            <div className="grid grid-cols-1 space-y-2">
              <label className="text-sm font-bold text-gray-500 tracking-wide">
                Title
              </label>
              <input
                value={title}
                className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                type=""
                placeholder="Enter the title of the file"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 space-y-2">
              <label className="text-sm font-bold text-gray-500 tracking-wide">
                Enter your Name
              </label>
              <input
                value={author}
                className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                type=""
                placeholder="Enter your name"
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 space-y-2">
              <label className="text-sm font-bold text-gray-500 tracking-wide">
                Subject
              </label>
              <input
                value={subject}
                className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                type=""
                placeholder="Enter the subject of the file"
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            {file != null ? (
              <div className="grid grid-cols-1 space-y-2">
                <p>Selected File: {file.name}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 space-y-2">
                <label className="text-sm font-bold text-gray-500 tracking-wide">
                  Attach Document
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                    <div className="h-full w-full text-center flex flex-col items-center justify-center items-center  ">
                      <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                        <img
                          className="has-mask h-36 object-center"
                          src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
                          alt="freepik image"
                        />
                      </div>
                      <p className="pointer-none text-gray-500 ">
                        <span className="text-sm">Drag and drop</span> files
                        here <br /> or{" "}
                        <a id="" className="text-blue-600 hover:underline">
                          select a file
                        </a>{" "}
                        from your computer
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </label>
                </div>
              </div>
            )}

            <p className="text-sm text-gray-300">
              <span>File type: doc,pdf,types of images</span>
            </p>
            <div>
              <button
                type="submit"
                className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n\t.has-mask {\n\t\tposition: absolute;\n\t\tclip: rect(10px, 150px, 130px, 10px);\n\t}\n",
        }}
      />
    </>
  );
}

export default AppWriteUpload;
