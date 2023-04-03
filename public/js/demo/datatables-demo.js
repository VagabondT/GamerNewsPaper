$(document).ready(async function(){

  function prettyDate(dateString){

    var dateString2 = dateString.toString();

    //if it's already a date object and not a string you don't need this line:
    var date = new Date(dateString2);
    var d = date.getDate();
    // var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
    var monthNames = [ "Thg1", "Thg2", "Thg3", "Thg4", "Thg5", "Thg6","Thg6", "Thg8", "Thg9", "Thg10", "Thg11", "Thg12" ];
    var m = monthNames[date.getMonth()];
    var y = date.getFullYear();
    return d+' '+m+' '+y;
  }

  function ConvertObjectTime(object){

      object.forEach(element => {
          if (element.DateChanged!== null){
              var holder= element.DateChanged;
              element.DateChangedString = prettyDate(holder);
          }
          if (element.DateCreate !== null){
              var holder2 = element.DateCreate;
              element.DateCreateString = prettyDate(holder2);
          }

      });
      return object;
  } 

  
  const postURL = window.location.origin + `/postControl/`
  var dataFromServer;
  var Role;
  try{
    const response = await axios({
        method: 'GET',
        url: postURL,
        
    })

    if (response.status == 200){
      dataFromServer = response.data;
      Role = response.data.Role
      console.log(dataFromServer.posts);
    }

    
  }catch (err){
      alert(err);

  }
  
  var dataTable = $('#posts_data').DataTable({
      'processing' : true,
      'aaSorting' : [],
      data: ConvertObjectTime(dataFromServer.posts),
      'columns' : [
          { data: 'Title',  title: 'Tựa đề'  },
          { data: 'Description',  title: 'Mô tả'  },
          { data: 'Category.Name',  title: 'Danh mục'  },
          { data: 'Author.Name',  title: 'Tác giả'  },
          { data: 'DateCreate',  title: 'Thời điểm tạo'  },
          { data: 'DateChanged',  title: 'Thay đổi gần nhất'  },
          { data: 'Status',  title: 'Tình trạng'  },

          { data: function(data, type, row) {
            var readBtn = '<button class="btn btn-success UpdateBtn" type="button" style="margin: 0.5rem" value='+data._id +' onclick="ReadPost(this)">Đọc</button>';
            var changeBtn = '<button class="btn btn-primary UpdateBtn" type="button" style="margin: 0.5rem" value='+data._id +' onclick="UpdatePost(this)">Sửa</button>';
            var delBtn = '<button class="btn btn-danger DelBtn" type="button" style="margin: 0.5rem" value=' + data._id +' onclick="DeletePost(this)">Xoá</button>';
            var cancelBtn = '<button class="btn btn-danger DelBtn" type="button" style="margin: 0.5rem" value=' + data._id +' onclick="CancelPost(this)">Huỷ</button>'
            var approveBtn = '<button class="btn btn-primary UpdateBtn" type="button" style="margin: 0.5rem" value=' + data._id +' onclick="ApprovePost(this)">Duyệt</button>'
            
            if (Role == 'editor'){
              if (data.Status == "draft")
                return changeBtn + delBtn
              else
                return 'Không có hành động'
            }

            if (Role == 'moderator')
              if (data.Status != "publish")
                return readBtn+ approveBtn + cancelBtn
              else return readBtn;

            if (Role =='admin') 
              return 'Không có hành động'

          }, title: 'Hành động' 
        }
      ],
 
  });

});