import PostForm from "../../components/forms/PostForm";

function CreatePost() {
  return (
    <div className="flex w-full h-max">
      <div className="flex flex-col gap-6 p-5 w-full">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img
            src="/assets/icons/add-post.svg"
            alt="add"
            width={36}
            height={36}
          />
          <h2 className="h3-bold md:h2-bold text-left w-full text-white">Create Post</h2>
        </div>

        <PostForm />
      </div>
    </div>
  );
}

export default CreatePost;
