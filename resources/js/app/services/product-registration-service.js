export async function product_registration_service(data){
  const res = await axios.post('/api/product_registration',data)
  return res.data
}

export async function get_product_registration_service(search) {
  try {
      const res = await axios.get("/api/product_registration" + `${window.location.search}`);
      return res.data.data;
  } catch (error) {
      return [];
  }
}

export async function get_product_registration_by_id_service() {
  try {
      const res = await axios.get("/api/product_registration/"+window.location.pathname.split('/')[3]+window.location.search);
      return res.data.result;
  } catch (error) {
      return [];
  }
}
