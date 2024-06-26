import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Input, notification, Typography} from "antd";
import axios from "axios";
import {runes} from "runes2";
import TextArea from "antd/es/input/TextArea";

function AddCollection(){
  const [loading, setLoading] = useState(true);
  const [collectionInput, setCollectionInput] = useState({
    slug: '',
    name: '',
    description: '',
    collection_id:'',
    status: '',
    meta_title: '',
    meta_keyword: '',
    meta_description: '',
    error_list: {} as { [key: string]: string },
  });
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    // e.presist();
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setCollectionInput({ ...collectionInput, [e.target.name]: value });
    console.log({...collectionInput,[e.target.name]:value})
    if (e.target.name === 'status') {
      console.log('Status:', value ? '1' : '0');
    }
    if (e.target.name === 'name') {
      const slug = generateSlug(value);
      setCollectionInput((prevCategory) => ({ ...prevCategory, slug: slug }));
    }
  }
  const [picture, setPicture]= useState<{image:File|null}>({image:null});

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPicture({ image: e.target.files[0] });
      console.log({ image: e.target.files[0] })
    }
  }
  const navigate = useNavigate();
  const submitCollection = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!picture.image) {
      notification.error({
        message:'Error',
        description:"Please select an image",
        placement:'bottomRight'
      })
      return;
    }
    const formData = new FormData();
    formData.append('slug',collectionInput.slug);
    formData.append('name',collectionInput.name);

    formData.append('status',collectionInput.status);

    if (picture.image) {
      formData.append('image', picture.image);
    }

    axios.post(`/api/store-collection`, formData).then(res => {
      if (res.data.status === 200) {
        notification.success({
          message:'Success',
          description:res.data.message,
          placement:'bottomRight'
        })
        navigate('/admin/view-collection')
        const form_category = document.getElementById('category_form') as HTMLFormElement;
        form_category.reset();
      } else if (res.data.status === 422) {
        notification.error({
          message:'Error',
          description:res.data.message,
          placement:'bottomRight'
        })

        setCollectionInput({ ...collectionInput, error_list: res.data.errors });
      }
      console.log("du lieu", formData)
    });
  }
  useEffect(() => {
    const generateSlug = (name) => {
      // Đổi tất cả ký tự thành chữ thường
      const slug = name.toLowerCase()
        // Loại bỏ các ký tự đặc biệt
        .replace(/[^\w\s]/g, '')
        // Thay thế khoảng trắng bằng dấu gạch ngang
        .replace(/\s+/g, '-');
      return slug;
    };

    const slug = generateSlug(collectionInput.name);
    setCollectionInput((prevCategory) => ({ ...prevCategory, slug: slug }));
  }, [collectionInput.name]);
  return(
    <>
      <div className="container-fluid px-4 fade-in">
        <div className="card-header float-end">

        </div>
        <h4 className="mt-4">
          Add Collection
          <Link to="/admin/view-collection" className="btn btn-primary btn-sm float-end">View Collection</Link>
        </h4>
        <form action="multipart/form-data" onSubmit={submitCollection} className="needs-validation g-3" >

          <div className="form-group mb-3">

            <Typography.Title level={5}>Name</Typography.Title>
            <Input type="text" name="name" onChange={handleInput} value={collectionInput.name} size="large"
                   required placeholder="Enter Name" title={"Enter Name"}
            />
            {collectionInput.error_list && collectionInput.error_list.name && (
              <div className="invalid-feedback ">
                <span>{collectionInput.error_list.name}</span>
              </div>
            )}
            {collectionInput.name && (
              <div className="text-muted float-end">{runes(collectionInput.name).length}</div>
            )}
          </div>
          <div className="form-group mb-3">
            <Typography.Title level={5}>Slug</Typography.Title>
            <Input type="text" name="slug" onChange={handleInput} value={collectionInput.slug} size="large"
                   required placeholder="Enter Slug" title="Enter Slug"

            />
            {collectionInput.error_list && collectionInput.error_list.slug && (
              <div className="invalid-feedback ">
                <span>{collectionInput.error_list.slug}</span>
              </div>
            )}
            {collectionInput.slug && (
              <div className="text-muted float-end">{runes(collectionInput.slug).length}</div>
            )}
          </div>

          <div className="col-md-4 mb-3 form-group">
            <label htmlFor="image">Image</label>
            <Input type="file" name="image" onChange={handleImage}/>
            <img src={picture.image ? URL.createObjectURL(picture.image) : ''} alt="Image" width="50px"/>

          </div>
          <div className="checkbox-wrapper-33">
            <Typography.Title level={5}>Status</Typography.Title>
            {/*<p className="checkbox__textwrapper" title={"Check: Hidden, Uncheck: Visible"}>Status</p>*/}
            <label className="checkbox">
              <Input className="checkbox__trigger visuallyhidden" name="status" onChange={handleInput}
                     value={collectionInput.status} type="checkbox" title={"Check: Hidden, Uncheck: Visible"}/>
              <span className="checkbox__symbol">
                    <svg aria-hidden="true" className="icon-checkbox" width="28px" height="28px" viewBox="0 0 28 28"
                         version="1" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 14l8 7L24 7"></path>
                    </svg>
                  </span>
            </label>
          </div>

          <button type="submit" className="btn btn-primary px-4 float-end">Add</button>

        </form>
      </div>
    </>
  )
}
export default AddCollection
