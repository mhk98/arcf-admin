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

import { useQuill } from "react-quilljs";
import { useGetAllProjectSubCategoryQuery } from "../../../../features/projectSubCategory/projectSubCategory";

import {
  useCreateGalleryCategoryDescriptionMutation,
  useDeleteGalleryCategoryDescriptionMutation,
  useGetAllGalleryCategoryDescriptionQuery,
  useUpdateGalleryCategoryDescriptionMutation,
} from "../../../../features/galleryBannerDescription/galleryBannerDescription";
import { useGetAllProjectsQuery } from "../../../../features/projects/projects";
import Content from "../../../../layout/content/Content";
import Head from "../../../../layout/head/Head";
// import { productData } from "../product/ProductData";

const GalleryBannerDescription = () => {
  // const [data, setData] = useState([]);
  const [file1, setFile1] = useState("");
  const [file2, setFile2] = useState("");
  const [file3, setFile3] = useState("");
  const [file4, setFile4] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [sm, updateSm] = useState(false);
  const [editData, setEditData] = useState({});
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const { quill, quillRef } = useQuill();

  useEffect(() => {
    if (quill) {
      quill.on("text-change", (delta, oldDelta, source) => {
        const description = quill.getText();

        // console.log(quill.getContents()); // Get delta contents
        console.log(quill.root.innerHTML); // Get innerHTML using quill
        // console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
      });
    }
  }, [quill]);

  const { data, isLoading, isError, error } = useGetAllGalleryCategoryDescriptionQuery();
  const [categoryDescription, setCategoryDescription] = useState([]);

  useEffect(() => {
    if (isError) {
      console.error("Error fetching gallery data", error);
    } else if (!isLoading) {
      if (data) {
        setCategoryDescription(data.data);
      }
    }
  }, [data, isLoading, isError, error]);

  const [category, setCategory] = useState("");
  const [updateId, setUpdateId] = useState("");
  const projectId = category.charAt(0);
  const restCategory = category.substring(1);

  const [subCategory, setSubCategory] = useState("");

  console.log("subCategory", subCategory);

  const subCategoryId = subCategory.charAt(0);
  const restSubCategory = subCategory.substring(1);

  console.log("subCategory", subCategoryId);

  const [createGalleryCategoryDescription] = useCreateGalleryCategoryDescriptionMutation();

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
  // const [files1, setFiles1] = useState([]);
  // const [files2, setFiles2] = useState([]);
  const [files, setFiles] = useState([]);

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
  function handleChange4(e) {
    setFile4(URL.createObjectURL(e.target.files[0]));
    if (e.target.files && e.target.files.length > 0) {
      setImage4(e.target.files[0]);
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
      text: "",
    });
    setImage1("");
    setImage2("");
    setImage3("");
    setImage4("");
    setFile1("");
    setFile2("");
    setFile3("");
    setFile4("");
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
    formData.append("text", data.text);
    formData.append("category", restCategory);
    formData.append("image1", image1);
    formData.append("image2", image2);
    formData.append("image3", image3);
    formData.append("image4", image4);

    console.log("formData", formData);

    try {
      const res = await createGalleryCategoryDescription(formData);
      if (res) {
        toast.success(res.data.message);
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

  const [updateGalleryCategoryDescription] = useUpdateGalleryCategoryDescriptionMutation(); // Use the generated update hook

  // Function to update a category
  const onEditSubmit = async (data) => {
    const formData = new FormData();
    formData.append("text", text);
    formData.append("title", title);
    formData.append("category", restCategory);
    formData.append("image1", image1);
    formData.append("image2", image2);
    formData.append("image3", image3);
    formData.append("image4", image4);

    try {
      const response = await updateGalleryCategoryDescription({
        id: updateId,
        data: formData,
      });

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

  const [deleteGalleryCategoryDescription] = useDeleteGalleryCategoryDescriptionMutation();

  // Function to delete a category
  const handleDeleteBanner = async (id) => {
    try {
      const res = await deleteGalleryCategoryDescription(id);
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

  // selects all the products
  // const selectorCheck = (e) => {
  //   let newData;
  //   newData = data.map((item) => {
  //     item.check = e.currentTarget.checked;
  //     return item;
  //   });
  //   setData([...newData]);
  // };

  // selects one product
  // const onSelectChange = (e, id) => {
  //   let newData = data;
  //   let index = newData.findIndex((item) => item.id === id);
  //   newData[index].check = e.currentTarget.checked;
  //   setData([...newData]);
  // };

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

  const [projects, setProjects] = useState([]);

  const { data: data1, isLoading: isLoading1, isError: isError1, error: error1 } = useGetAllProjectsQuery();
  useEffect(() => {
    if (isError1) {
      console.error("Error fetching gallery data", error1);
    } else if (!isLoading1) {
      if (data1) {
        setProjects(data1.data);
      }
    }
  }, [data1, isLoading1, isError1, error1]);

  const [subCategories, setSubCategories] = useState([]);

  const { data: data2, isLoading: isLoading2, isError: isError2, error: error2 } = useGetAllProjectSubCategoryQuery();
  useEffect(() => {
    if (isError2) {
      console.error("Error fetching gallery data", error2);
    } else if (!isLoading2) {
      if (data2) {
        setSubCategories(data2.data);
      }
    }
  }, [data2, isLoading2, isError2, error2]);

  //   const project = data1?.data || "";

  console.log("data", categoryDescription);
  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;

  const currentItems = categoryDescription.slice(indexOfFirstItem, indexOfLastItem);

  // console.log("currentItems", currentItems);
  // Change Page

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //   console.log("project", project);
  return (
    <React.Fragment>
      <Head title="Products"></Head>
      <Content>
        {/* Header Part Start */}
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle>Gallery</BlockTitle>
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
                        <span>Add Subcategory Description</span>
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
                <span>Image-1</span>
              </DataTableRow>
              <DataTableRow size="sm">
                <span>Image-2</span>
              </DataTableRow>
              <DataTableRow size="sm">
                <span>Image-3</span>
              </DataTableRow>
              <DataTableRow size="sm">
                <span>Image-4</span>
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
                        <img src={`http://localhost:5000/${item.image1}`} alt="product" className="thumb" />
                      </span>
                    </DataTableRow>
                    <DataTableRow size="sm">
                      <span className="tb-product">
                        <img src={`http://localhost:5000/${item.image2}`} alt="product" className="thumb" />
                      </span>
                    </DataTableRow>
                    <DataTableRow size="sm">
                      <span className="tb-product">
                        <img src={`http://localhost:5000/${item.image3}`} alt="product" className="thumb" />
                      </span>
                    </DataTableRow>
                    <DataTableRow size="sm">
                      <span className="tb-product">
                        <img src={`http://localhost:5000/${item.image4}`} alt="product" className="thumb" />
                      </span>
                    </DataTableRow>

                    <DataTableRow>
                      <span className="tb-sub">{item.title}</span>
                    </DataTableRow>
                    <DataTableRow>
                      {/* <span className="tb-sub">{item.text}</span> */}
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
                                        text: item.text,
                                        image1: item.image1,
                                        image2: item.image2,
                                        image3: item.image3,
                                        image4: item.image4,
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
                <span className="text-silent">No gallery found</span>
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
              <h5 className="title">Update Gallery</h5>
              <div className="mt-4">
                <form onSubmit={handleSubmit1(onEditSubmit)} enctype="multipart/form-data" method="post">
                  <Row className="g-3">
                    <Col size="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="product-title">
                          Subcategory Title
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            name="title"
                            defaultValue={editData.title}
                            onChange={(e) => setTitle(e.target.value)}
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
                            type="text"
                            name="text"
                            defaultValue={editData.text}
                            onChange={(e) => setText(e.target.value)}
                            style={{ width: "100%", padding: "10px", height: "120px" }}
                          />

                          {errors1.text && <p style={{ color: "red" }}>Text length limit should be 135 character</p>}
                        </div>
                      </div>
                    </Col>

                    <Col size="6">
                      <div className="form-group">
                        <p className="form-label" htmlFor="image1">
                          Subcategory Slider-1
                        </p>
                        <div className="form-control-wrap">
                          <input style={{ cursor: "pointer" }} accept="image/*" type="file" onChange={handleChange1} />
                          {file1 ? (
                            <img src={file1} alt="" />
                          ) : (
                            <img src={`http://localhost:5000/${editData.image1}`} alt="" />
                          )}
                        </div>
                      </div>
                    </Col>
                    <Col size="6">
                      <div className="form-group">
                        <p className="form-label" htmlFor="image2">
                          Subcategory Slider-2
                        </p>
                        <div className="form-control-wrap">
                          <input style={{ cursor: "pointer" }} accept="image/*" type="file" onChange={handleChange2} />
                          {file2 ? (
                            <img src={setFile2} alt="" />
                          ) : (
                            <img src={`http://localhost:5000/${editData.image2}`} alt="" />
                          )}
                        </div>
                      </div>
                    </Col>
                    <Col size="6">
                      <div className="form-group">
                        <p className="form-label" htmlFor="image1">
                          Subcategory Slider-3
                        </p>
                        <div className="form-control-wrap">
                          <input style={{ cursor: "pointer" }} accept="image/*" type="file" onChange={handleChange3} />
                          {file3 ? (
                            <img src={file3} alt="" />
                          ) : (
                            <img src={`http://localhost:5000/${editData.image3}`} alt="" />
                          )}
                        </div>
                      </div>
                    </Col>
                    <Col size="6">
                      <div className="form-group">
                        <p className="form-label" htmlFor="image2">
                          Subcategory Description Image
                        </p>
                        <div className="form-control-wrap">
                          <input style={{ cursor: "pointer" }} accept="image/*" type="file" onChange={handleChange4} />
                          {file4 ? (
                            <img src={file4} alt="" />
                          ) : (
                            <img src={`http://localhost:5000/${editData.image4}`} alt="" />
                          )}
                        </div>
                      </div>
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
              <BlockTitle tag="h5">Add Subcategory Description</BlockTitle>
              <BlockDes>
                <p>Add information or update Subcategory Description.</p>
              </BlockDes>
            </BlockHeadContent>
          </BlockHead>
          <Block>
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <Row className="g-3">
                <Col size="12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="product-title">
                      Subcategory Title
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
                        type="text"
                        name="text"
                        {...register("text")}
                        style={{ width: "100%", padding: "10px", height: "120px" }}
                      />

                      {errors.text && <p style={{ color: "red" }}>Text length limit should be 135 character</p>}
                    </div>
                  </div>
                </Col>

                <Col size="6">
                  <div className="form-group">
                    <p className="form-label" htmlFor="image1">
                      Subcategory Slider-1
                    </p>
                    <div className="form-control-wrap">
                      <input style={{ cursor: "pointer" }} accept="image/*" type="file" onChange={handleChange1} />
                      <img src={file1} alt="" />
                    </div>
                  </div>
                </Col>
                <Col size="6">
                  <div className="form-group">
                    <p className="form-label" htmlFor="image2">
                      Subcategory Slider-2
                    </p>
                    <div className="form-control-wrap">
                      <input style={{ cursor: "pointer" }} accept="image/*" type="file" onChange={handleChange2} />
                      <img src={file2} alt="" />
                    </div>
                  </div>
                </Col>
                <Col size="6">
                  <div className="form-group">
                    <p className="form-label" htmlFor="image1">
                      Subcategory Slider-3
                    </p>
                    <div className="form-control-wrap">
                      <input style={{ cursor: "pointer" }} accept="image/*" type="file" onChange={handleChange3} />
                      <img src={file3} alt="" />
                    </div>
                  </div>
                </Col>
                <Col size="6">
                  <div className="form-group">
                    <p className="form-label" htmlFor="image2">
                      Subcategory Description Image
                    </p>
                    <div className="form-control-wrap">
                      <input style={{ cursor: "pointer" }} accept="image/*" type="file" onChange={handleChange4} />
                      <img src={file4} alt="" />
                    </div>
                  </div>
                </Col>

                <Col size="12">
                  <Button color="primary" type="submit">
                    <Icon className="plus"></Icon>
                    <span>Add Subcategory Header</span>
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

export default GalleryBannerDescription;
