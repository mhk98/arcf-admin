import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, UncontrolledDropdown } from "reactstrap";
import SimpleBar from "simplebar-react";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Button,
  Col,
  DataTableHead,
  DataTableItem,
  DataTableRow,
  Icon,
  PaginationComponent,
  PreviewAltCard,
  Row,
} from "../../../../components/Component";

import toast from "react-hot-toast";

import { Form } from "react-bootstrap";
import {
  useCreateProjectsMutation,
  useDeleteProjectsMutation,
  useGetAllProjectsQuery,
  useUpdateProjectsMutation,
} from "../../../../features/projects/projects";
import Content from "../../../../layout/content/Content";
import Head from "../../../../layout/head/Head";
// import { productData } from "../product/ProductData";

const Projects = () => {
  // const [data, setData] = useState([]);
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");
  const [sm, updateSm] = useState(false);
  const [category, setCategory] = useState("");
  const [file1, setFile1] = useState("");
  const [file2, setFile2] = useState("");
  const [file3, setFile3] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");

  const [title, setTitle] = useState("");
  const [editData, setEditData] = useState({});

  const { data, isLoading, error } = useGetAllProjectsQuery();
  const [createProjects] = useCreateProjectsMutation();

  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCheckboxChange = (category) => {
    setSelectedCategory((prevSelected) => (prevSelected === category ? "" : category));
    console.log("Selected category:", category);
  };
  const [updateId, setUpdateId] = useState("");

  const [txt, setTxt] = useState("");
  const [maxChars] = useState(124);
  const [remainingChars] = useState(0);

  const onChange = (e) => {
    setTxt(e.currentTarget.value.slice(0, maxChars));
  };

  useEffect(() => {
    const colorStyle = {
      color: `${maxChars - txt.length < remainingChars ? "red" : "blue"}`,
      display: `${maxChars - txt.length < remainingChars ? "inline" : "none"}`,
    };

    const spanElement = document.getElementById("char-count");

    if (spanElement) {
      Object.entries(colorStyle).forEach(([key, value]) => {
        spanElement.style[key] = value;
      });
    }
  }, [txt, maxChars, remainingChars]);

  function handleChange1(e) {
    setFile1(URL.createObjectURL(e.target.files[0]));
    if (e.target.files && e.target.files.length > 0) {
      setImage1(e.target.files[0]);
    }
  }
  function handleChange2(e) {
    setFile2(URL.createObjectURL(e.target.files[0]));
    if (e.target.files && e.target.files.length > 0) {
      setImage2(e.target.files[0]);
    }
  }
  function handleChange3(e) {
    setFile3(URL.createObjectURL(e.target.files[0]));
    if (e.target.files && e.target.files.length > 0) {
      setImage3(e.target.files[0]);
    }
  }

  const customStyles = {
    option: (provided) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
    }),
    input: (provided) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
    }),
  };

  const [formData, setFormData] = useState({
    title: "",
    image: "",
    text: "",
    category: "",
  });
  const [editId, setEditedId] = useState();
  const [view, setView] = useState({
    edit: false,
    add: false,
    details: false,
  });
  const [onSearchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(7);
  const [files, setFiles] = useState([]);

  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  }

  // function to close the form modal
  const onFormCancel = () => {
    setView({ edit: false, add: false, details: false });
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      image: "",
      text: "",
      category: "",
    });

    setFiles([]);
    setFile("");
    setImage("");
    setFile1("");
    setImage1("");
    setFile2("");
    setImage2("");
    setFile3("");
    setImage3("");
    setTxt("");
    setTitle("");

    reset({});
  };

  const {
    register,
    handleSubmit,
    reset,
    getValues,

    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const onFormSubmit = async (data) => {
    console.log("form", data);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("text", txt);
    formData.append("category", category);
    formData.append("page", selectedCategory);
    formData.append("image1", image1);
    formData.append("image2", image2);
    formData.append("image3", image3);

    console.log("formData", formData);

    try {
      const res = await createProjects(formData);
      if (res) {
        toast.success(res.data.message);
        setFiles([]);
        resetForm();
      }
    } catch (error) {
      toast.error(error.message);
    }

    setFiles([]);
    resetForm();
  };

  const {
    register: register1,
    handleSubmit: handleSubmit1,
    reset: reset1,

    formState: { errors: errors1 },
  } = useForm();

  const [updateProjects] = useUpdateProjectsMutation(); // Use the generated update hook

  // Function to update a category
  const onEditSubmit = async (data) => {
    const formData = new FormData();
    formData.append("text", txt);
    formData.append("title", title);
    formData.append("category", category);
    formData.append("page", selectedCategory);
    formData.append("image1", image1);
    formData.append("image2", image2);
    formData.append("image3", image3);

    try {
      const response = await updateProjects({ id: updateId, data: formData });

      if (response) {
        toast.success(response.data.message);
        onFormCancel();
      }
    } catch (error) {
      toast.error(error.message);
    }
    setFiles([]);
    resetForm();
  };

  const [deleteProjects] = useDeleteProjectsMutation();

  // Function to delete a category
  const handleDeleteBanner = async (id) => {
    try {
      const res = await deleteProjects(id);
      if (res) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    reset(formData);
    reset1(formData);
  }, [formData]);

  // onChange function for searching name
  const onFilterChange = (e) => {
    setSearchText(e.target.value);
  };

  // toggle function to view product details
  const toggle = (type) => {
    setView({
      edit: type === "edit" ? true : false,
      add: type === "add" ? true : false,
      details: type === "details" ? true : false,
    });
  };

  const projects = data?.data || "";

  console.log("data", projects);
  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;

  const currentItems = projects.slice(indexOfFirstItem, indexOfLastItem);

  // console.log("currentItems", currentItems);
  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  console.log("category", category);
  return (
    <React.Fragment>
      <Head title="Products"></Head>
      <Content>
        {/* Header Part Start */}
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle>Projects</BlockTitle>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <a
                  href="#more"
                  className="btn btn-icon btn-trigger toggle-expand me-n1"
                  onClick={(ev) => {
                    ev.preventDefault();
                    updateSm(!sm);
                  }}
                >
                  <Icon name="more-v"></Icon>
                </a>
                <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li>
                      <div className="form-control-wrap">
                        <div className="form-icon form-icon-right">
                          <Icon name="search"></Icon>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          id="default-04"
                          placeholder="Quick search by SKU"
                          onChange={(e) => onFilterChange(e)}
                        />
                      </div>
                    </li>
                    <li>
                      <UncontrolledDropdown>
                        <DropdownToggle
                          color="transparent"
                          className="dropdown-toggle dropdown-indicator btn btn-outline-light btn-white"
                        >
                          Status
                        </DropdownToggle>
                        <DropdownMenu end>
                          <ul className="link-list-opt no-bdr">
                            <li>
                              <DropdownItem tag="a" href="#dropdownitem" onClick={(ev) => ev.preventDefault()}>
                                <span>New Items</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem tag="a" href="#dropdownitem" onClick={(ev) => ev.preventDefault()}>
                                <span>Featured</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem tag="a" href="#dropdownitem" onClick={(ev) => ev.preventDefault()}>
                                <span>Out of Stock</span>
                              </DropdownItem>
                            </li>
                          </ul>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </li>
                    <li className="nk-block-tools-opt">
                      <Button
                        className="toggle btn-icon d-md-none"
                        color="primary"
                        onClick={() => {
                          toggle("add");
                        }}
                      >
                        <Icon name="plus"></Icon>
                      </Button>
                      <Button
                        className="toggle d-none d-md-inline-flex"
                        color="primary"
                        onClick={() => {
                          toggle("add");
                        }}
                      >
                        <Icon name="plus"></Icon>
                        <span>Add Projects</span>
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        {/* Header Part End */}

        {error ? <>Oh, no there was an error</> : isLoading ? <>Loading...</> : currentItems ? <></> : null}

        <Block>
          <div className="nk-tb-list is-separate is-medium mb-3">
            <DataTableHead className="nk-tb-item">
              {/* <DataTableRow className="nk-tb-col-check">
                <div className="custom-control custom-control-sm custom-checkbox notext">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="uid_1"
                    onChange={(e) => selectorCheck(e)}
                  />
                  <label className="custom-control-label" htmlFor="uid_1"></label>
                </div>
              </DataTableRow> */}
              <DataTableRow size="sm">
                <span>Slider Image-1</span>
              </DataTableRow>
              <DataTableRow size="sm">
                <span>Slider Image-2</span>
              </DataTableRow>
              <DataTableRow size="sm">
                <span>Slider Image-3</span>
              </DataTableRow>

              <DataTableRow size="sm">
                <span>Page</span>
              </DataTableRow>

              <DataTableRow size="sm">
                <span>Title</span>
              </DataTableRow>

              <DataTableRow size="sm">
                <span>Description</span>
              </DataTableRow>

              <DataTableRow>
                <span>Create Date</span>
              </DataTableRow>

              <DataTableRow size="md">
                <span>Created By</span>
              </DataTableRow>

              <DataTableRow className="nk-tb-col-tools">
                <ul className="nk-tb-actions gx-1 my-n1">
                  <li className="me-n1">
                    <UncontrolledDropdown>
                      <DropdownToggle
                        tag="a"
                        href="#toggle"
                        onClick={(ev) => ev.preventDefault()}
                        className="dropdown-toggle btn btn-icon btn-trigger"
                      >
                        <Icon name="more-h"></Icon>
                      </DropdownToggle>
                    </UncontrolledDropdown>
                  </li>
                </ul>
              </DataTableRow>
            </DataTableHead>
            {currentItems.length > 0
              ? currentItems.map((item) => (
                  <DataTableItem key={item.Id}>
                    {/* <DataTableRow className="nk-tb-col-check">
                      <div className="custom-control custom-control-sm custom-checkbox notext">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          defaultChecked={item.Check}
                          id={item.id + "uid1"}
                          key={Math.random()}
                          onChange={(e) => onSelectChange(e, item.Category_Id)}
                        />
                        <label className="custom-control-label" htmlFor={item.id + "uid1"}></label>
                      </div>
                    </DataTableRow> */}
                    <DataTableRow size="sm">
                      <span className="tb-product">
                        <img src={`https://server.arcfbd.org/${item.image1}`} alt="product" className="thumb" />
                      </span>
                    </DataTableRow>
                    <DataTableRow size="sm">
                      <span className="tb-product">
                        <img src={`https://server.arcfbd.org/${item.image2}`} alt="product" className="thumb" />
                      </span>
                    </DataTableRow>
                    <DataTableRow size="sm">
                      <span className="tb-product">
                        <img src={`https://server.arcfbd.org/${item.image3}`} alt="product" className="thumb" />
                      </span>
                    </DataTableRow>

                    <DataTableRow>
                      <span className="tb-sub">{item.page}</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span className="tb-sub">{item.title}</span>
                    </DataTableRow>
                    <DataTableRow>
                      <div dangerouslySetInnerHTML={{ __html: item.text }} />
                    </DataTableRow>

                    <DataTableRow>
                      <span className="tb-sub">$ {item.createdAt}</span>
                    </DataTableRow>

                    <DataTableRow>
                      <span className="tb-sub">Admin</span>
                    </DataTableRow>
                    {/* <DataTableRow size="md">
                      <span className="tb-sub">{categoryList.join(", ")}</span>
                    </DataTableRow> */}

                    <DataTableRow className="nk-tb-col-tools">
                      <ul className="nk-tb-actions gx-1 my-n1">
                        <li className="me-n1">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              tag="a"
                              href="#more"
                              onClick={(ev) => ev.preventDefault()}
                              className="dropdown-toggle btn btn-icon btn-trigger"
                            >
                              <Icon name="more-h"></Icon>
                            </DropdownToggle>
                            <DropdownMenu end>
                              <ul className="link-list-opt no-bdr">
                                <li>
                                  <DropdownItem
                                    tag="a"
                                    href="#edit"
                                    onClick={(ev) => {
                                      ev.preventDefault();
                                      setUpdateId(item.Id);
                                      setEditData({
                                        title: item.title,
                                        txt: item.text,
                                        image1: item.image1,
                                        image2: item.image2,
                                        image3: item.image3,
                                      });
                                      toggle("edit");
                                    }}
                                  >
                                    <Icon name="edit"></Icon>
                                    <span>Edit</span>
                                  </DropdownItem>
                                </li>
                                {/* <li>
                                    <DropdownItem
                                      tag="a"
                                      href="#view"
                                      onClick={(ev) => {
                                        ev.preventDefault();
                                        onEditClick(item.id);
                                        toggle("details");
                                      }}
                                    >
                                      <Icon name="eye"></Icon>
                                      <span>View Product</span>
                                    </DropdownItem>
                                  </li> */}
                                <li>
                                  <DropdownItem
                                    tag="a"
                                    href="#remove"
                                    onClick={(ev) => {
                                      ev.preventDefault();
                                      handleDeleteBanner(item.Id);
                                    }}
                                  >
                                    <Icon name="trash"></Icon>
                                    <span>Remove </span>
                                  </DropdownItem>
                                </li>
                              </ul>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </li>
                      </ul>
                    </DataTableRow>
                  </DataTableItem>
                ))
              : null}
          </div>

          <PreviewAltCard>
            {projects.length > 0 ? (
              <PaginationComponent
                itemPerPage={itemPerPage}
                totalItems={projects.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            ) : (
              <div className="text-center">
                <span className="text-silent">No projects found</span>
              </div>
            )}
          </PreviewAltCard>
        </Block>

        <Modal isOpen={view.edit} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a href="#cancel" className="close">
              {" "}
              <Icon
                name="cross-sm"
                onClick={(ev) => {
                  ev.preventDefault();
                  onFormCancel();
                }}
              ></Icon>
            </a>
            <div className="p-2">
              <h5 className="title">Update Projects</h5>
              <div className="mt-4">
                <form onSubmit={handleSubmit1(onEditSubmit)} enctype="multipart/form-data" method="post">
                  <Row className="g-3">
                    <Col size="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="product-title">
                          Project Title
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            name="title"
                            defaultValue={editData.title}
                            onChange={(e) => setTitle(e.target.value)}
                            style={{ width: "100%", padding: "10px" }}
                          />
                          {errors1.title && <span className="invalid">{errors1.title.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col size="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="product-title">
                          Description
                        </label>
                        <div className="form-control-wrap">
                          <textarea
                            rows="3"
                            // cols="50"
                            onChange={onChange}
                            defaultValue={editData.txt}
                            maxLength={maxChars}
                            minLength="1"
                            placeholder="Enter message"
                            style={{ width: "100%", padding: "10px", height: "120px" }}
                          />
                          <p>
                            {txt.length}/{maxChars}
                          </p>
                        </div>
                      </div>
                    </Col>
                    <Col size="12">
                      <Form.Select aria-label="Default select example" onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Choose Category</option>
                        <option value="Health">Health</option>
                        <option value="Education">Education</option>
                        <option value="Microcredit">Microcredit</option>
                        <option value="Improving Quality Of Life">Improving Quality Of Life</option>
                        <option value="Environment">Environment</option>
                        <option value="Orphanage">Orphanage</option>
                        <option value="Old Home">Old Home</option>
                      </Form.Select>
                    </Col>
                    <Col size="6">
                      <div className="form-group">
                        <p className="form-label" htmlFor="category">
                          Projects Slider-1
                        </p>
                        <div className="form-control-wrap">
                          <input style={{ cursor: "pointer" }} accept="image/*" type="file" onChange={handleChange1} />
                          {file1 ? (
                            <img src={file1} alt="" />
                          ) : (
                            <img src={`https://server.arcfbd.org/${editData.image1}`} alt="" />
                          )}
                        </div>
                      </div>
                    </Col>
                    <Col size="6">
                      <div className="form-group">
                        <p className="form-label" htmlFor="category">
                          Projects Slider-2
                        </p>
                        <div className="form-control-wrap">
                          <input style={{ cursor: "pointer" }} accept="image/*" type="file" onChange={handleChange2} />
                          {file2 ? (
                            <img src={file2} alt="" />
                          ) : (
                            <img src={`https://server.arcfbd.org/${editData.image2}`} alt="" />
                          )}
                        </div>
                      </div>
                    </Col>
                    <Col size="6">
                      <div className="form-group">
                        <p className="form-label" htmlFor="category">
                          Projects Slider-3
                        </p>
                        <div className="form-control-wrap">
                          <input style={{ cursor: "pointer" }} accept="image/*" type="file" onChange={handleChange3} />
                          {file3 ? (
                            <img src={file3} alt="" />
                          ) : (
                            <img src={`https://server.arcfbd.org/${editData.image3}`} alt="" />
                          )}
                        </div>
                      </div>
                    </Col>
                    <Col size="6">
                      <label className="form-label mt-5" htmlFor="category">
                        Select Page
                      </label>
                      <br />
                      <label>
                        <input
                          type="checkbox"
                          value="Home"
                          checked={selectedCategory === "Home"}
                          onChange={() => handleCheckboxChange("Home")}
                        />
                        <span className="ms-1">Home</span>
                      </label>
                      <label className="ms-2">
                        <input
                          type="checkbox"
                          value="Donation"
                          checked={selectedCategory === "Donation"}
                          onChange={() => handleCheckboxChange("Donation")}
                        />
                        <span className="ms-1">Donation</span>
                      </label>
                    </Col>

                    <Col size="12">
                      <Button color="primary" type="submit">
                        <Icon className="plus"></Icon>
                        <span>Save Change</span>
                      </Button>
                    </Col>
                  </Row>
                </form>
              </div>
            </div>
          </ModalBody>
        </Modal>

        <SimpleBar
          className={`nk-add-product toggle-slide toggle-slide-right toggle-screen-any ${
            view.add ? "content-active" : ""
          }`}
        >
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h5">Add Projects</BlockTitle>
              <BlockDes>
                <p>Add information or update Projects.</p>
              </BlockDes>
            </BlockHeadContent>
          </BlockHead>
          <Block>
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <Row className="g-3">
                <Col size="12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="product-title">
                      Project Title
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        name="title"
                        {...register("title", {})}
                        style={{ width: "100%", padding: "10px" }}
                      />
                      {errors.title && <span className="invalid">{errors.title.message}</span>}
                    </div>
                  </div>
                </Col>

                <Col size="12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="product-title">
                      Description
                    </label>
                    <div className="form-control-wrap">
                      <textarea
                        rows="3"
                        // cols="50"
                        onChange={onChange}
                        maxLength={maxChars}
                        minLength="1"
                        value={txt}
                        placeholder="Enter message"
                        style={{ width: "100%", padding: "10px", height: "120px" }}
                      />
                      <p>
                        {txt.length}/{maxChars}
                      </p>
                    </div>
                  </div>
                </Col>
                <Col size="12">
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) => setCategory(e.target.value)}
                    style={{ marginTop: "100px" }}
                  >
                    <option value="">Choose Category</option>
                    <option value="Health">Health</option>
                    <option value="Education">Education</option>
                    <option value="Microcredit">Microcredit</option>
                    <option value="Improving Quality Of Life">Improving Quality Of Life</option>
                    <option value="Environment">Environment</option>
                    <option value="Orphanage">Orphanage</option>
                    <option value="Old Home">Old Home</option>
                  </Form.Select>
                </Col>
                <Col size="6">
                  <div className="form-group">
                    <p className="form-label" htmlFor="category">
                      Projects Slider-1
                    </p>
                    <div className="form-control-wrap">
                      <input style={{ cursor: "pointer" }} accept="image/*" type="file" onChange={handleChange1} />
                      <img src={file1} alt="" />
                    </div>
                  </div>
                </Col>
                <Col size="6">
                  <div className="form-group">
                    <p className="form-label" htmlFor="category">
                      Projects Slider-2
                    </p>
                    <div className="form-control-wrap">
                      <input style={{ cursor: "pointer" }} accept="image/*" type="file" onChange={handleChange2} />
                      <img src={file2} alt="" />
                    </div>
                  </div>
                </Col>
                <Col size="6">
                  <div className="form-group">
                    <p className="form-label" htmlFor="category">
                      Projects Slider-3
                    </p>
                    <div className="form-control-wrap">
                      <input style={{ cursor: "pointer" }} accept="image/*" type="file" onChange={handleChange3} />
                      <img src={file3} alt="" />
                    </div>
                  </div>
                </Col>

                <Col size="6">
                  <label className="form-label mt-5" htmlFor="category">
                    Select Page
                  </label>
                  <br />
                  <label>
                    <input
                      type="checkbox"
                      value="Home"
                      checked={selectedCategory === "Home"}
                      onChange={() => handleCheckboxChange("Home")}
                    />
                    <span className="ms-1">Home</span>
                  </label>
                  <label className="ms-2">
                    <input
                      type="checkbox"
                      value="Donation"
                      checked={selectedCategory === "Donation"}
                      onChange={() => handleCheckboxChange("Donation")}
                    />
                    <span className="ms-1">Donation</span>
                  </label>

                  <label className="ms-2">
                    <input
                      type="checkbox"
                      value="Footer"
                      checked={selectedCategory === "Footer"}
                      onChange={() => handleCheckboxChange("Footer")}
                    />
                    <span className="ms-1">Footer</span>
                  </label>
                </Col>

                <Col size="12">
                  <Button color="primary" type="submit">
                    <Icon className="plus"></Icon>
                    <span>Add Projects</span>
                  </Button>
                </Col>
              </Row>
            </form>
          </Block>
        </SimpleBar>

        {view.add && <div className="toggle-overlay" onClick={toggle}></div>}
      </Content>
    </React.Fragment>
  );
};

export default Projects;
