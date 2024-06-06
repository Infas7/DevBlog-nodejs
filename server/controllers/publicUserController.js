const Post = require("../models/Post");

const renderHome = async (req, res) => {
  try {
    const locals = {
      title: "Dev Blogs",
      description: "Simple Blog site for programmers or devs",
    };
    let perPage = 10;
    let page = req.query.page || 1;

    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Post.count();
    const nextPage = parseInt(page) + 1;
    const hasNextpage = nextPage <= Math.ceil(count / perPage);

    res.render("index", {
      locals,
      data,
      current: page,
      nextPage: hasNextpage ? nextPage : null,
    });
  } catch (error) {
    console.log(error);
  }
};

const renderSinglePost = async (req, res) => {
  try {
    let slug = req.params.id;

    const data = await Post.findById({ _id: slug });

    const locals = {
      title: data.title,
      description: "Simple Blog site for programmers or devs",
    };
    res.render("post", { locals, data });
  } catch (error) {
    console.log(error);
  }
};

const handleSearch = async (req, res) => {
  try {
    const locals = {
      title: "Search",
      description: "Simple Blog site for programmers or devs",
    };

    let searchTerm = req.body.searchTerm;
    const filteredSearchTerm = searchTerm.replace(/[^a-zA-Z0-9]/g, "");

    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(filteredSearchTerm, "i") } },
        { body: { $regex: new RegExp(filteredSearchTerm, "i") } },
      ],
    });

    res.render("search", { locals, data });
  } catch (error) {
    console.log(error);
  }
};

const renderAbout = (req, res) => {
  const locals = {
    title: "About",
    description: "Simple Blog created with NodeJs, Express & MongoDb.",
  };
  res.render("about", { locals });
};

const renderContact = (req, res) => {
  const locals = {
    title: "Contact",
    description: "Simple Blog created with NodeJs, Express & MongoDb.",
  };
  res.render("contact", { locals });
};

module.exports = {
  renderHome,
  renderSinglePost,
  handleSearch,
  renderAbout,
  renderContact,
};
