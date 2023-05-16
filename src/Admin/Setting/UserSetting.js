import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar"
import Header from "../Header";
import { reactLocalStorage } from 'reactjs-localstorage';
import Multiselect from "multiselect-react-dropdown";

import { useNavigate, NavLink, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import edit from "../AddOrder/icon34.svg"
import { PostAdminSettingAddCategory, GetSettingViewPermission, GetCategoryDetails, PatchEditCategoryDetails, DeleteCategoryDetails } from "../../Redux/action/ApiCollection";
import { PermissionData } from "../../Permission";
import { concat } from "lodash";


const UserSetting = () => {

  const [addcategory, setAddCategory] = useState(false)
  const [editcategory, setEditCategory] = useState(false)
  const [categoryname, setCategoryName] = useState('')
  const [permissiondata, setPermissionData] = useState('')
  const [useraccess, setUserAccess] = useState('')
  const [fromdate, setFromDate] = useState('')
  const [todate, setToDate] = useState('')
  const [categoryid, setCategoryId] = useState('')


  const [editpermissiondata, setEditPermissionData] = useState(false);
  const [editremovedpermissiondata, setEditRemovedPermissionData] = useState([]);

  const [selectededitpermission, setSelectedEditPermission] = useState([]);
  const [selectededitpermissiondata, setSelectedEditPermissionData] = useState([]);

  const [oneditfixedpermissiondata, setOnEditFixedPermissionData] = useState([]);



  const [showpermissionobjectdata, setShowPermissionObjectData] = useState(false);
  const [showpermissiondatatruefalse, setShowPermissionDataTrueFalse] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let IsAdminRole=reactLocalStorage.get("Admin_Role",false)


  const ToggleFunData = useSelector(
    (state) => state.ToggleSideBarReducer.ToggleSideBarData
  );

  const PostAdminSettingAddCategoryData = useSelector(
    (state) =>
      state.PostAdminSettingAddCategoryReducer.PostAdminSettingAddCategoryData
        ?.data
  );
  const GetSettingViewPermissionData = useSelector(
    (state) =>
      state.GetSettingViewPermissionReducer.GetSettingViewPermissionData
        ?.data
  );

  const PatchEditCategoryDetailsData = useSelector(
    (state) =>
      state.PatchEditCategoryDetailsReducer.PatchEditCategoryDetailsData

  );

  const GetCategoryDetailsData = useSelector(
    (state) =>
      state.GetCategoryDetailsReducer.GetCategoryDetailsData
        ?.data
  );

  const DeleteCategoryDetailsData = useSelector(
    (state) =>
      state.DeleteCategoryDetailsReducer.DeleteCategoryDetailsData
        ?.data
  );


  useEffect(() => {
   
    dispatch(GetSettingViewPermission())
    dispatch(GetCategoryDetails())
    // if (PatchEditCategoryDetailsData.status == 200) {
    //     setCategoryName("");
    //     setUserPermission("");
    //     setUserAccess("");
    //     setFromDate("");
    //     setToDate("");
    //   }
    if (PatchEditCategoryDetailsData?.status == 200) {
      setEditCategory((o) => !o)
    }

  }, [PatchEditCategoryDetailsData])
  const AddCategory = (e) => {
    let payload = {
      category_name: categoryname,
      permission: permissiondata,
    };
    dispatch(PostAdminSettingAddCategory(payload))
    // dispatch(PatchEditCategoryDetails(payload))
    setAddCategory((o) => !o)
    // setEditCategory((o) => !o)
  }

  const DeleteCategory = (e, data) => {
    let deleted = {
      category_id: data.id,
    }
    dispatch(DeleteCategoryDetails(deleted))
  }
  const EditCategory = (e, data) => {
    setCategoryId(data?.id)
    setCategoryName(data?.category_name);
    setPermissionData(data?.permission);
    setUserAccess(data?.user_access);
    setFromDate(data?.from_date);
    setToDate(data?.to_date);
    setEditCategory((o) => !o)
  }
  const EditSaveBtn = (e) => {
    let edit = {
      "category_name": categoryname,
      "permission": oneditfixedpermissiondata,
      "category_id": categoryid
      // "access": useraccess,
      // "from_date": fromdate,
      // "to_date": todate,
      // "category_id": categoryid
    }
    dispatch(PatchEditCategoryDetails(edit))
  }
  const onSelect = (selectedList, selectedItem) => {
    let array = [];
    selectedList.map((item, id) => {
      array.push(item);
    });
    let pyloadData = array.map((item, id) => {
      return item.permission
    })
    setPermissionData(pyloadData);
  };
  const onRemove = (selectedList, removedItem) => {
    let array = [];
    selectedList.map((item, id) => {
      array.push(item);
    });

    let pyloadData = array.map((item, id) => {

      return item.permission
    })
    setPermissionData(pyloadData);
  };
  const onSelectEdit = (selectedList, selectedItem) => {
    setSelectedEditPermission([...selectededitpermission, selectedItem])
    let array = [];
    selectedList.map((item, id) => {
      array.push(item?.permission);
    });
    setEditPermissionData(array);
  };
  const onRemoveEdit = (selectedList, removedItem) => {
    setEditRemovedPermissionData([...editremovedpermissiondata, removedItem])
    let array = [];
    selectedList.map((item, id) => {
      array.push(item?.permission);
    });
    setEditPermissionData(array);
  };
  useEffect(() => {
    if (permissiondata) {
      let arrayData = []
      let filteredData = permissiondata.map((item) => {
        return item.permission
      })
      arrayData.push(filteredData)
      if (editpermissiondata !== false) {
        setOnEditFixedPermissionData(editpermissiondata)
      }
      else {
        setOnEditFixedPermissionData(permissiondata)
      }
    }
  }, [permissiondata, editpermissiondata])
  const ShowPermissionDataFun = (e, data) => {
    setShowPermissionObjectData(data);
    setShowPermissionDataTrueFalse((o) => !o);
  };


  return (
    <div className={`${ToggleFunData ? "collapsemenu" : ""}`}>
      <Header />
      <div className='dashboard-part  '>
        <Sidebar />
        <div className="content-sec usersetting-sec">
          <div className="title-bar ">
            {IsAdminRole==="true"?<button type="button"

              className={`btn add-btn ${PermissionData()?.CREATE_CATEGORY == "CREATE_CATEGORY" ? " " : "permission_blur"}`}

              onClick={(e) =>
                PermissionData()?.CREATE_CATEGORY == "CREATE_CATEGORY" ?
                  setAddCategory((o) => !o) : ""}>
              + Add Category </button>:""}
            <button className="backbtn" type="button" onClick={(e) => {
              navigate("/admin/setting");
            }}> Back </button>
          </div>

          {IsAdminRole==="true"?<div className="usersetting-table">
            <table>
              <tr>
                <th>Category</th>
                {/* <th>Duration</th> */}
                <th>Permission</th>
                <th>Action</th>
                <th></th>
              </tr>
              {PermissionData()?.VIEW_CATEGORY == "VIEW_CATEGORY" ?
                GetCategoryDetailsData &&
                GetCategoryDetailsData?.category_details_list.map((item, id) => {
                  return (
                    <tr >
                      <td>{item.category_name}</td>

                      <td>

                        <li>
                          <td>{item?.permission[0]?.permission}

                            <span onClick={(e) => ShowPermissionDataFun(e, item)}
                              className="order-btn text-primary" role="button" >
                              ....

                              {item?.id == showpermissionobjectdata?.id && showpermissiondatatruefalse == true &&
                                <div className="dropdown">
                                  <ul className=" permission_all ">
                                    {GetCategoryDetailsData &&
                                      item?.permission?.map((item, id) => {
                                        return <li className="text-dark text-nowrap">{id + 1}.  {item.permission}</li>
                                      })}
                                  </ul>
                                </div>}
                            </span>
                          </td>
                        </li>


                      </td>

                      <td className="pb-2 pt-1">
                        <button className={`btn me-1
                        ${PermissionData()?.EDIT_CATEGORY == "EDIT_CATEGORY" ? " " : "permission_blur"}`}
                          type="button"> <img src='/images/icon35.svg' alt="img"
                            onClick={(e) =>
                              PermissionData()?.DELETE_CATEGORY == "DELETE_CATEGORY" ?
                                DeleteCategory(e, item) : ""} />
                        </button>

                        <button type="button"
                          className={`btn ${PermissionData()?.EDIT_CATEGORY == "EDIT_CATEGORY" ? " " : "permission_blur"}`} >
                          <img src={edit} alt='img'
                            onClick={(e) =>
                              PermissionData()?.EDIT_CATEGORY == "EDIT_CATEGORY" ?
                                EditCategory(e, item) : ""} />
                        </button>

                      </td>
                    </tr>
                  );
                }) : ""}

            </table>
          </div>:<h3>Only Admin Can Access This Page</h3>}

          {/* =============================Add Category========================================= */}
          {addcategory && (
            <div className="popupouter">
              <div className="popupinner addcategorypopup">
                <h2>Add Category</h2>
                <div className='close-btn' type='button' onClick={(e) => setAddCategory((o) => !o)}>
                  <svg viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.31053 4.37167L0.19544 0H1.47666L4.97286 3.80037L8.46906 0H9.73941L5.65689 4.37167L10 9H8.70793L4.97286 4.95952L1.2595 9H0L4.31053 4.37167Z" fill="black" />
                  </svg></div>
                <div className='row mx-0 pt-3'>

                  <div className='col-12 p-0 m-0 mb-3'>
                    <label>Category Name</label>
                    <input type="text" className="form-control" placeholder="Category Name"
                      value={categoryname}
                      onChange={(e) => setCategoryName(e.target.value)}
                    />
                  </div>
                  <div className='col-12 p-0 mb-4'>
                    <label>Permissions</label>
                    <Multiselect
                      options={GetSettingViewPermissionData?.user_permissions}
                      // Options to display in the dropdown
                      // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                      onSelect={onSelect} // Function will trigger on select event
                      onRemove={onRemove} // Function will trigger on remove event
                      displayValue="permission" // Property name to display in the dropdown options
                      showCheckbox
                    />
                  </div>

                  <div className='col-12 '>
                    <div className="btngroups text-end mt-3">
                      <button type="button" className="btn save-btn" onClick={(e) => AddCategory(e)}>Save</button>
                      <button type="button" className="btn cancel-btn" onClick={(e) => setAddCategory((o) => !o)}>Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================Edit Category=============================================== */}


          {editcategory && (
            <div className="popupouter">
              <div className="popupinner">
                <h2>Edit User</h2>
                <div className='close-btn' type='button' onClick={(e) => setEditCategory((o) => !o)}>
                  <svg viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.31053 4.37167L0.19544 0H1.47666L4.97286 3.80037L8.46906 0H9.73941L5.65689 4.37167L10 9H8.70793L4.97286 4.95952L1.2595 9H0L4.31053 4.37167Z" fill="black" />
                  </svg></div>
                <div className='popup-body row mx-0'>

                  <div className='col-12'>
                    <label>Category Name</label>
                    <input type="text" className="form-control"
                      value={categoryname}
                      placeholder="Design Team" />
                  </div>



                  <div className='col-12'>
                    <label>Permissions</label>
                  </div>
                  <div className="col-md-12">


                    <Multiselect
                      options={GetSettingViewPermissionData?.user_permissions}
                      // Options to display in the dropdown
                      // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                      onSelect={onSelectEdit} // Function will trigger on select event
                      onRemove={onRemoveEdit} // Function will trigger on remove event
                      displayValue="permission" // Property name to display in the dropdown options
                      selectedValues={permissiondata}
                      showCheckbox
                    />
                  </div>

                  <div className='col-12'>
                    <div className="btngroups text-end my-3">
                      <button type="button" className="btn save-btn" onClick={(e) => EditSaveBtn(e)}>Save</button>
                      <button type="button" className="btn cancel-btn" onClick={(e) => setEditCategory((o) => !o)}>Cancel</button>
                    </div>

                  </div>



                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default UserSetting
