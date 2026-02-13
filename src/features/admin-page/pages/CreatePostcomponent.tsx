import { useState, ChangeEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Post {
  title: string;
  description: string;
  content: string;
  category_id: number | null;
  status_id: number | null;
}

interface ImageFile {
  file: File;
}

function CreatePostComponent(): JSX.Element {
  const navigate = useNavigate();

  const [post, setPost] = useState<Post>({
    title: "",
    description: "",
    content: "",
    category_id: null,
    status_id: null,
  });

  const [imageFile, setImageFile] = useState<ImageFile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

    if (!file) return;

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a valid image file (JPEG, PNG, GIF, WebP).");
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("The file is too large. Please upload an image smaller than 5MB.");
      return;
    }

    setImageFile({ file });
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setPost((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async (statusId: number): Promise<void> => {
    if (!imageFile) {
      alert("Please select an image file.");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("category_id", String(post.category_id));
    formData.append("description", post.description);
    formData.append("content", post.content);
    formData.append("status_id", String(statusId));
    formData.append("imageFile", imageFile.file);

    try {
      await axios.post(
        "http://localhost:4000/api/posts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Post created successfully!");
      navigate("/admin/posts");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Create New Post</h2>
      <form>
        <div>
          <label>Thumbnail Image</label>
          <div>
            {imageFile ? (
              <img
                src={URL.createObjectURL(imageFile.file)}
                alt="Preview"
                style={{ width: "300px", height: "auto" }}
              />
            ) : (
              <div>No image selected</div>
            )}

            <input type="file" onChange={handleFileChange} />
          </div>
        </div>

        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={post.description}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Content</label>
          <textarea
            name="content"
            value={post.content}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <button
            type="button"
            onClick={() => handleSave(1)}
            disabled={isLoading}
          >
            Save as Draft
          </button>

          <button
            type="button"
            onClick={() => handleSave(2)}
            disabled={isLoading}
          >
            Save and Publish
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePostComponent;
