// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, UncontrolledDropdown } from "reactstrap";
// import SimpleBar from "simplebar-react";
// import {
//   Block,
//   BlockBetween,
//   BlockDes,
//   BlockHead,
//   BlockHeadContent,
//   BlockTitle,
//   Button,
//   Col,
//   DataTableHead,
//   DataTableItem,
//   DataTableRow,
//   Icon,
//   PaginationComponent,
//   PreviewAltCard,
//   Row,
// } from "../../../../components/Component";

// import toast from "react-hot-toast";
// import {
//   useCreateCategoryMutation,
//   useDeleteCategoryMutation,
//   useGetAllCategoryQuery,
//   useUpdateCategoryMutation,
// } from "../../../../features/category/category";
// import Content from "../../../../layout/content/Content";
// import Head from "../../../../layout/head/Head";
// // import { productData } from "../product/ProductData";

// const ProductList = () => {
//   // const [data, setData] = useState([]);
//   const [file, setFile] = useState();
//   const [image, setImage] = useState();
//   const [sm, updateSm] = useState(false);
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const { data, isLoading, error } = useGetAllCategoryQuery();
//   const [createCategory] = useCreateCategoryMutation();

//   const handleCategoryChange = (selectedOptions) => {
//     setSelectedCategories(selectedOptions);
//   };

//   const [updateId, setUpdateId] = useState("");

//   const customStyles = {
//     option: (provided) => ({
//       ...provided,
//       display: "flex",
//       alignItems: "center",
//     }),
//     input: (provided) => ({
//       ...provided,
//       display: "flex",
//       alignItems: "center",
//     }),
//   };

//   const [formData, setFormData] = useState({
//     Name: "",
//     Image: "",
//   });
//   const [editId, setEditedId] = useState();
//   const [view, setView] = useState({
//     edit: false,
//     add: false,
//     details: false,
//   });
//   const [onSearchText, setSearchText] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemPerPage] = useState(7);
//   const [files, setFiles] = useState([]);

//   function handleChange(e) {
//     setFile(URL.createObjectURL(e.target.files[0]));
//     if (e.target.files && e.target.files.length > 0) {
//       setImage(e.target.files[0]);
//     }
//   }

//   // function to close the form modal
//   const onFormCancel = () => {
//     setView({ edit: false, add: false, details: false });
//     resetForm();
//   };

//   const resetForm = () => {
//     setFormData({
//       Name: "",
//       Image: null,
//     });
//     reset({});
//   };

//   const {
//     register,
//     handleSubmit,
//     reset,
//     getValues,

//     formState: { errors },
//   } = useForm({
//     mode: "onTouched",
//   });

//   const onFormSubmit = async (form) => {
//     const formData = new FormData();
//     formData.append("Name", form.Name);
//     formData.append("Stock", form.Stock);
//     formData.append("Image", image);

//     console.log("formData", formData);
//     try {
//       const res = await createCategory(formData);
//       if (res) {
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }

//     setFiles([]);
//     resetForm();
//   };

//   const {
//     register: register1,
//     handleSubmit: handleSubmit1,
//     reset: reset1,

//     formState: { errors: errors1 },
//   } = useForm();

//   // const onEditSubmit = async (data) => {
//   //   const formData = new FormData();
//   //   formData.append("Name", data.Name);
//   //   formData.append("Stock", data.Stock);
//   //   formData.append("Image", image);

//   //   console.log("formData", formData);
//   //   try {
//   //     const data = await axios.put(`https://server.arcfbd.org/api/v1/category/${updateId}`, formData);

//   //     if (data) {
//   //       toast.success(data.data.message);
//   //     }
//   //   } catch (error) {
//   //     console.log("Error", error);
//   //   }

//   //   resetForm();
//   // };

//   const [updateResourceMutation] = useUpdateCategoryMutation(); // Use the generated update hook

//   // Function to update a category
//   const onEditSubmit = async (data) => {
//     const formData = new FormData();
//     formData.append("Name", data.Name);
//     formData.append("Stock", data.Stock);
//     formData.append("Image", image);

//     try {
//       const response = await updateResourceMutation({ id: updateId, data: formData });

//       if (response) {
//         toast.success(response.data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//     setFiles([]);
//     resetForm();
//   };

//   const [deleteCategoryMutation] = useDeleteCategoryMutation();

//   // Function to delete a category
//   const deleteCategory = async (id) => {
//     try {
//       const res = await deleteCategoryMutation(id);
//       if (res) {
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     reset(formData);
//   }, [formData]);

//   // selects all the products
//   // const selectorCheck = (e) => {
//   //   let newData;
//   //   newData = data.map((item) => {
//   //     item.check = e.currentTarget.checked;
//   //     return item;
//   //   });
//   //   setData([...newData]);
//   // };

//   // selects one product
//   // const onSelectChange = (e, id) => {
//   //   let newData = data;
//   //   let index = newData.findIndex((item) => item.id === id);
//   //   newData[index].check = e.currentTarget.checked;
//   //   setData([...newData]);
//   // };

//   // onChange function for searching name
//   const onFilterChange = (e) => {
//     setSearchText(e.target.value);
//   };

//   // toggle function to view product details
//   const toggle = (type) => {
//     setView({
//       edit: type === "edit" ? true : false,
//       add: type === "add" ? true : false,
//       details: type === "details" ? true : false,
//     });
//   };

//   const category = data?.data || "";
//   // Get current list, pagination
//   const indexOfLastItem = currentPage * itemPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemPerPage;

//   const currentItems = category.slice(indexOfFirstItem, indexOfLastItem);

//   // console.log("currentItems", currentItems);
//   // Change Page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <React.Fragment>
//       <Head title="Products"></Head>
//       <Content>
//         {/* Header Part Start */}
//         <BlockHead size="sm">
//           <BlockBetween>
//             <BlockHeadContent>
//               <BlockTitle>Products</BlockTitle>
//             </BlockHeadContent>
//             <BlockHeadContent>
//               <div className="toggle-wrap nk-block-tools-toggle">
//                 <a
//                   href="#more"
//                   className="btn btn-icon btn-trigger toggle-expand me-n1"
//                   onClick={(ev) => {
//                     ev.preventDefault();
//                     updateSm(!sm);
//                   }}
//                 >
//                   <Icon name="more-v"></Icon>
//                 </a>
//                 <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
//                   <ul className="nk-block-tools g-3">
//                     <li>
//                       <div className="form-control-wrap">
//                         <div className="form-icon form-icon-right">
//                           <Icon name="search"></Icon>
//                         </div>
//                         <input
//                           type="text"
//                           className="form-control"
//                           id="default-04"
//                           placeholder="Quick search by SKU"
//                           onChange={(e) => onFilterChange(e)}
//                         />
//                       </div>
//                     </li>
//                     <li>
//                       <UncontrolledDropdown>
//                         <DropdownToggle
//                           color="transparent"
//                           className="dropdown-toggle dropdown-indicator btn btn-outline-light btn-white"
//                         >
//                           Status
//                         </DropdownToggle>
//                         <DropdownMenu end>
//                           <ul className="link-list-opt no-bdr">
//                             <li>
//                               <DropdownItem tag="a" href="#dropdownitem" onClick={(ev) => ev.preventDefault()}>
//                                 <span>New Items</span>
//                               </DropdownItem>
//                             </li>
//                             <li>
//                               <DropdownItem tag="a" href="#dropdownitem" onClick={(ev) => ev.preventDefault()}>
//                                 <span>Featured</span>
//                               </DropdownItem>
//                             </li>
//                             <li>
//                               <DropdownItem tag="a" href="#dropdownitem" onClick={(ev) => ev.preventDefault()}>
//                                 <span>Out of Stock</span>
//                               </DropdownItem>
//                             </li>
//                           </ul>
//                         </DropdownMenu>
//                       </UncontrolledDropdown>
//                     </li>
//                     <li className="nk-block-tools-opt">
//                       <Button
//                         className="toggle btn-icon d-md-none"
//                         color="primary"
//                         onClick={() => {
//                           toggle("add");
//                         }}
//                       >
//                         <Icon name="plus"></Icon>
//                       </Button>
//                       <Button
//                         className="toggle d-none d-md-inline-flex"
//                         color="primary"
//                         onClick={() => {
//                           toggle("add");
//                         }}
//                       >
//                         <Icon name="plus"></Icon>
//                         <span>Add Category</span>
//                       </Button>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </BlockHeadContent>
//           </BlockBetween>
//         </BlockHead>

//         {/* Header Part End */}

//         {error ? <>Oh, no there was an error</> : isLoading ? <>Loading...</> : currentItems ? <></> : null}

//         <Block>
//           <div className="nk-tb-list is-separate is-medium mb-3">
//             <DataTableHead className="nk-tb-item">
//               {/* <DataTableRow className="nk-tb-col-check">
//                 <div className="custom-control custom-control-sm custom-checkbox notext">
//                   <input
//                     type="checkbox"
//                     className="custom-control-input"
//                     id="uid_1"
//                     onChange={(e) => selectorCheck(e)}
//                   />
//                   <label className="custom-control-label" htmlFor="uid_1"></label>
//                 </div>
//               </DataTableRow> */}
//               <DataTableRow size="sm">
//                 <span>Category Name</span>
//               </DataTableRow>

//               <DataTableRow size="sm">
//                 <span>Stock</span>
//               </DataTableRow>

//               <DataTableRow>
//                 <span>Create Date</span>
//               </DataTableRow>
//               <DataTableRow>
//                 <span>Modified Date</span>
//               </DataTableRow>
//               <DataTableRow size="md">
//                 <span>Created By</span>
//               </DataTableRow>

//               <DataTableRow className="nk-tb-col-tools">
//                 <ul className="nk-tb-actions gx-1 my-n1">
//                   <li className="me-n1">
//                     <UncontrolledDropdown>
//                       <DropdownToggle
//                         tag="a"
//                         href="#toggle"
//                         onClick={(ev) => ev.preventDefault()}
//                         className="dropdown-toggle btn btn-icon btn-trigger"
//                       >
//                         <Icon name="more-h"></Icon>
//                       </DropdownToggle>
//                     </UncontrolledDropdown>
//                   </li>
//                 </ul>
//               </DataTableRow>
//             </DataTableHead>
//             {currentItems.length > 0
//               ? currentItems.map((item) => (
//                   <DataTableItem key={item.Category_Id}>
//                     {/* <DataTableRow className="nk-tb-col-check">
//                       <div className="custom-control custom-control-sm custom-checkbox notext">
//                         <input
//                           type="checkbox"
//                           className="custom-control-input"
//                           defaultChecked={item.Check}
//                           id={item.id + "uid1"}
//                           key={Math.random()}
//                           onChange={(e) => onSelectChange(e, item.Category_Id)}
//                         />
//                         <label className="custom-control-label" htmlFor={item.id + "uid1"}></label>
//                       </div>
//                     </DataTableRow> */}
//                     <DataTableRow size="sm">
//                       <span className="tb-product">
//                         <img src={`https://server.arcfbd.org/${item.Image}`} alt="product" className="thumb" />
//                         <span className="title">{item.Name}</span>
//                       </span>
//                     </DataTableRow>

//                     <DataTableRow>
//                       <span className="tb-sub">{item.Stock}</span>
//                     </DataTableRow>

//                     <DataTableRow>
//                       <span className="tb-sub">$ {item.createdAt}</span>
//                     </DataTableRow>
//                     <DataTableRow>
//                       <span className="tb-sub">{item.stock}</span>
//                     </DataTableRow>

//                     <DataTableRow>
//                       <span className="tb-sub">Admin</span>
//                     </DataTableRow>
//                     {/* <DataTableRow size="md">
//                       <span className="tb-sub">{categoryList.join(", ")}</span>
//                     </DataTableRow> */}

//                     <DataTableRow className="nk-tb-col-tools">
//                       <ul className="nk-tb-actions gx-1 my-n1">
//                         <li className="me-n1">
//                           <UncontrolledDropdown>
//                             <DropdownToggle
//                               tag="a"
//                               href="#more"
//                               onClick={(ev) => ev.preventDefault()}
//                               className="dropdown-toggle btn btn-icon btn-trigger"
//                             >
//                               <Icon name="more-h"></Icon>
//                             </DropdownToggle>
//                             <DropdownMenu end>
//                               <ul className="link-list-opt no-bdr">
//                                 <li>
//                                   <DropdownItem
//                                     tag="a"
//                                     href="#edit"
//                                     onClick={(ev) => {
//                                       ev.preventDefault();
//                                       setUpdateId(item.Category_Id);
//                                       toggle("edit");
//                                     }}
//                                   >
//                                     <Icon name="edit"></Icon>
//                                     <span>Edit</span>
//                                   </DropdownItem>
//                                 </li>
//                                 {/* <li>
//                                     <DropdownItem
//                                       tag="a"
//                                       href="#view"
//                                       onClick={(ev) => {
//                                         ev.preventDefault();
//                                         onEditClick(item.id);
//                                         toggle("details");
//                                       }}
//                                     >
//                                       <Icon name="eye"></Icon>
//                                       <span>View Product</span>
//                                     </DropdownItem>
//                                   </li> */}
//                                 <li>
//                                   <DropdownItem
//                                     tag="a"
//                                     href="#remove"
//                                     onClick={(ev) => {
//                                       ev.preventDefault();
//                                       deleteCategory(item.Category_Id);
//                                     }}
//                                   >
//                                     <Icon name="trash"></Icon>
//                                     <span>Remove </span>
//                                   </DropdownItem>
//                                 </li>
//                               </ul>
//                             </DropdownMenu>
//                           </UncontrolledDropdown>
//                         </li>
//                       </ul>
//                     </DataTableRow>
//                   </DataTableItem>
//                 ))
//               : null}
//           </div>

//           <PreviewAltCard>
//             {category.length > 0 ? (
//               <PaginationComponent
//                 itemPerPage={itemPerPage}
//                 totalItems={category.length}
//                 paginate={paginate}
//                 currentPage={currentPage}
//               />
//             ) : (
//               <div className="text-center">
//                 <span className="text-silent">No products found</span>
//               </div>
//             )}
//           </PreviewAltCard>
//         </Block>

//         <Modal isOpen={view.edit} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
//           <ModalBody>
//             <a href="#cancel" className="close">
//               {" "}
//               <Icon
//                 name="cross-sm"
//                 onClick={(ev) => {
//                   ev.preventDefault();
//                   onFormCancel();
//                 }}
//               ></Icon>
//             </a>
//             <div className="p-2">
//               <h5 className="title">Update Category</h5>
//               <div className="mt-4">
//                 <form onSubmit={handleSubmit1(onEditSubmit)}>
//                   <Row className="g-3">
//                     <Col size="12">
//                       <div className="form-group">
//                         <label className="form-label" htmlFor="product-title">
//                           Category Name
//                         </label>
//                         <div className="form-control-wrap">
//                           <input
//                             type="text"
//                             name="Name"
//                             {...register1("Name", {
//                               required: "this field is required.",
//                             })}
//                           />
//                           {errors.Name && <span className="invalid">{errors.Name.message}</span>}
//                         </div>
//                       </div>
//                     </Col>
//                     <Col size="12">
//                       <div className="form-group">
//                         <label className="form-label" htmlFor="product-title">
//                           Stock
//                         </label>
//                         <div className="form-control-wrap">
//                           <input
//                             type=""
//                             name="Stock"
//                             {...register1("Stock", {
//                               required: "this field is required.",
//                             })}
//                           />
//                           {errors.Stock && <span className="invalid">{errors.Stock.message}</span>}
//                         </div>
//                       </div>
//                     </Col>

//                     <Col size="6">
//                       <div className="form-group">
//                         <label className="form-label" htmlFor="category">
//                           Category Image
//                         </label>
//                         <div className="form-control-wrap">
//                           <input accept="image/*" type="file" onChange={handleChange} />
//                           <img src={file} alt="" />
//                         </div>
//                       </div>
//                     </Col>

//                     <Col size="12">
//                       <Button color="primary" type="submit">
//                         <Icon className="plus"></Icon>
//                         <span>Update Category</span>
//                       </Button>
//                     </Col>
//                   </Row>
//                 </form>
//               </div>
//             </div>
//           </ModalBody>
//         </Modal>

//         <SimpleBar
//           className={`nk-add-product toggle-slide toggle-slide-right toggle-screen-any ${
//             view.add ? "content-active" : ""
//           }`}
//         >
//           <BlockHead>
//             <BlockHeadContent>
//               <BlockTitle tag="h5">Add Category</BlockTitle>
//               <BlockDes>
//                 <p>Add information or update Category.</p>
//               </BlockDes>
//             </BlockHeadContent>
//           </BlockHead>
//           <Block>
//             <form onSubmit={handleSubmit(onFormSubmit)}>
//               <Row className="g-3">
//                 <Col size="12">
//                   <div className="form-group">
//                     <label className="form-label" htmlFor="product-title">
//                       Category Name
//                     </label>
//                     <div className="form-control-wrap">
//                       <input
//                         type="text"
//                         name="Name"
//                         {...register("Name", {
//                           required: "this field is required.",
//                         })}
//                       />
//                       {errors.Name && <span className="invalid">{errors.Name.message}</span>}
//                     </div>
//                   </div>
//                 </Col>
//                 <Col size="12">
//                   <div className="form-group">
//                     <label className="form-label" htmlFor="product-title">
//                       Stock
//                     </label>
//                     <div className="form-control-wrap">
//                       <input
//                         type="text"
//                         name="Stock"
//                         {...register("Stock", {
//                           required: "this field is required.",
//                         })}
//                       />
//                       {errors.Stock && <span className="invalid">{errors.Stock.message}</span>}
//                     </div>
//                   </div>
//                 </Col>

//                 <Col size="6">
//                   <div className="form-group">
//                     <label className="form-label" htmlFor="category">
//                       Category Image
//                     </label>
//                     <div className="form-control-wrap">
//                       <input accept="image/*" type="file" onChange={handleChange} />
//                       <img src={file} alt="" />
//                     </div>
//                   </div>
//                 </Col>

//                 <Col size="12">
//                   <Button color="primary" type="submit">
//                     <Icon className="plus"></Icon>
//                     <span>Add Category</span>
//                   </Button>
//                 </Col>
//               </Row>
//             </form>
//           </Block>
//         </SimpleBar>

//         {view.add && <div className="toggle-overlay" onClick={toggle}></div>}
//       </Content>
//     </React.Fragment>
//   );
// };

// export default ProductList;
