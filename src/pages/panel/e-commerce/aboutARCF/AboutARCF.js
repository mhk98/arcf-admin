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

import {
  useCreateAboutARCFMutation,
  useDeleteAboutARCFMutation,
  useGetAllAboutARCFQuery,
  useUpdateAboutARCFMutation,
} from "../../../../features/aboutARCF/aboutARCF";
import Content from "../../../../layout/content/Content";
import Head from "../../../../layout/head/Head";

// import { productData } from "../product/ProductData";

const AboutARCF = () => {
  // const [data, setData] = useState([]);
  const [file1, setFile1] = useState("");
  const [file2, setFile2] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [sm, updateSm] = useState(false);

  const [point1, setPoint1] = useState("");
  const [point2, setPoint2] = useState("");
  const [point3, setPoint3] = useState("");
  const [heading, setHeading] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [editData, setEditData] = useState({});

  const { data, isLoading, error } = useGetAllAboutARCFQuery();
  const [createAboutARCF] = useCreateAboutARCFMutation();

  const [updateId, setUpdateId] = useState("");

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
    text: "",
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
  // function to close the form modal
  const onFormCancel = () => {
    setView({ edit: false, add: false, details: false });
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      heading: "",
      point1: "",
      point2: "",
      point3: "",
      text: "",
    });
    setFile1("");
    setImage1("");
    setFile2("");
    setImage2("");
    setTitle("");
    setText("");
    setPoint1("");
    setPoint2("");
    setPoint3("");
    setHeading("");

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
    console.log("form", data.title);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("heading", data.heading);
    formData.append("point1", data.point1);
    formData.append("point2", data.point2);
    formData.append("point3", data.point3);
    formData.append("text", data.text);
    formData.append("image1", image1);
    formData.append("image2", image2);

    console.log("formData", formData.title);
    try {
      const res = await createAboutARCF(formData);
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

  // const onEditSubmit = async (data) => {
  //   const formData = new FormData();
  //   formData.append("Name", data.Name);
  //   formData.append("Stock", data.Stock);
  //   formData.append("Image", image);

  //   console.log("formData", formData);
  //   try {
  //     const data = await axios.put(`https://server.arcfbd.org/api/v1/category/${updateId}`, formData);

  //     if (data) {
  //       toast.success(data.data.message);
  //     }
  //   } catch (error) {
  //     console.log("Error", error);
  //   }

  //   resetForm();
  // };

  const [updateSlider] = useUpdateAboutARCFMutation(); // Use the generated update hook

  // Function to update a category
  const onEditSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("heading", heading);
    formData.append("point1", point1);
    formData.append("point2", point2);
    formData.append("point3", point3);
    formData.append("text", text);
    formData.append("image1", image1);
    formData.append("image2", image2);

    try {
      const response = await updateSlider({ id: updateId, data: formData });

      if (response) {
        toast.success(response.data.message);
        onFormCancel();
        reset("");
      }
    } catch (error) {
      toast.error(error.message);
    }
    setFiles([]);
    resetForm();
  };

  const [deleteAboutARCF] = useDeleteAboutARCFMutation();

  // Function to delete a category
  const handleDeleteSlider = async (id) => {
    try {
      const res = await deleteAboutARCF(id);
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

  const slider = data?.data || "";

  console.log("data", slider);
  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;

  const currentItems = slider.slice(indexOfFirstItem, indexOfLastItem);

  // console.log("currentItems", currentItems);
  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <React.Fragment>
      <Head title="Products"></Head>
      <Content>
        {/* Header Part Start */}
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle>About</BlockTitle>
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
                        <span>Add ARCF About</span>
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
                <span> Image-1</span>
              </DataTableRow>

              <DataTableRow size="sm">
                <span> Image-2</span>
              </DataTableRow>
              <DataTableRow size="sm">
                <span>Title</span>
              </DataTableRow>
              <DataTableRow size="sm">
                <span>Heading</span>
              </DataTableRow>
              <DataTableRow size="sm">
                <span>Description</span>
              </DataTableRow>
              <DataTableRow size="sm">
                <span>Point-1</span>
              </DataTableRow>
              <DataTableRow size="sm">
                <span>Point-2</span>
              </DataTableRow>
              <DataTableRow size="sm">
                <span>Point-3</span>
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
                  <DataTableItem key={item.Category_Id}>
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

                    <DataTableRow>
                      <span className="tb-sub">{item.title}</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span className="tb-sub">{item.heading}</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span className="tb-sub">{item.text}</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span className="tb-sub">{item.point1}</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span className="tb-sub">{item.point2}</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span className="tb-sub">{item.point3}</span>
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
                                        heading: item.heading,
                                        point1: item.point1,
                                        point2: item.point2,
                                        point3: item.point3,
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
                                      handleDeleteSlider(item.Id);
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
            {slider.length > 0 ? (
              <PaginationComponent
                itemPerPage={itemPerPage}
                totalItems={slider.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            ) : (
              <div className="text-center">
                <span className="text-silent">No sliders found</span>
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
              <h5 className="title">Update About ARCF </h5>
              <div className="mt-4">
                <form onSubmit={handleSubmit1(onEditSubmit)}>
                  <Row className="g-3">
                    <Col size="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="product-title">
                          Title
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
                            defaultValue={editData.text}
                            name="text"
                            onChange={(e) => setText(e.target.value)}
                            style={{ width: "100%", padding: "10px", height: "120px" }}
                          />
                          {errors.text && <span className="invalid">{errors.text.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col size="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="product-title">
                          Heading
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            defaultValue={editData.heading}
                            name="heading"
                            onChange={(e) => setHeading(e.target.value)}
                            style={{ width: "100%", padding: "10px" }}
                          />
                          {errors.heading && <span className="invalid">{errors.heading.message}</span>}
                        </div>
                      </div>
                    </Col>

                    <Col size="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="product-title">
                          Point 1
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            name="point1"
                            defaultValue={editData.point1}
                            onChange={(e) => setPoint1(e.target.value)}
                            style={{ width: "100%", padding: "10px" }}
                          />
                          {errors.point1 && <span className="invalid">{errors.point1.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col size="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="product-title">
                          Point 2
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            name="point2"
                            defaultValue={editData.point2}
                            onChange={(e) => setPoint2(e.target.value)}
                            style={{ width: "100%", padding: "10px" }}
                          />
                          {errors.point2 && <span className="invalid">{errors.point2.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col size="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="product-title">
                          Point 3
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            name="point3"
                            defaultValue={editData.point3}
                            onChange={(e) => setPoint3(e.target.value)}
                            style={{ width: "100%", padding: "10px" }}
                          />
                          {errors.point3 && <span className="invalid">{errors.point3.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col size="6">
                      <div className="form-group">
                        <p className="form-label" htmlFor="category">
                          About Image1
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
                          About Image2
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
              <BlockTitle tag="h5">Add ARCF About</BlockTitle>
              <BlockDes>
                <p>Add information or update about ARCF.</p>
              </BlockDes>
            </BlockHeadContent>
          </BlockHead>
          <Block>
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <Row className="g-3">
                <Col size="12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="product-title">
                      Title
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
                      Heading
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        name="heading"
                        {...register("heading", {})}
                        style={{ width: "100%", padding: "10px" }}
                      />
                      {errors.heading && <span className="invalid">{errors.heading.message}</span>}
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
                        {...register("text", {})}
                        style={{ width: "100%", padding: "10px", height: "120px" }}
                      />
                      {errors.text && <span className="invalid">{errors.text.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col size="12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="product-title">
                      Point 1
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        name="point1"
                        {...register("point1", {})}
                        style={{ width: "100%", padding: "10px" }}
                      />
                      {errors.point1 && <span className="invalid">{errors.point1.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col size="12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="product-title">
                      Point 2
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        name="point2"
                        {...register("point2", {})}
                        style={{ width: "100%", padding: "10px" }}
                      />
                      {errors.point2 && <span className="invalid">{errors.point2.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col size="12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="product-title">
                      Point 3
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        name="point3"
                        {...register("point3", {})}
                        style={{ width: "100%", padding: "10px" }}
                      />
                      {errors.point3 && <span className="invalid">{errors.point3.message}</span>}
                    </div>
                  </div>
                </Col>

                <Col size="6">
                  <div className="form-group">
                    <p className="form-label" htmlFor="category">
                      About Image1
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
                      About Image2
                    </p>
                    <div className="form-control-wrap">
                      <input style={{ cursor: "pointer" }} accept="image/*" type="file" onChange={handleChange2} />
                      <img src={file2} alt="" />
                    </div>
                  </div>
                </Col>

                <Col size="12">
                  <Button color="primary" type="submit">
                    <Icon className="plus"></Icon>
                    <span>Add ARCF About</span>
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

export default AboutARCF;
