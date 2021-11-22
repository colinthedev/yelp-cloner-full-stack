const { default: SearchBar } = require("../../components/SearchBar/SearchBar");

const Yelp = {
    searchYelp(term, location) {
        return fetch(`/api/hello?term=${term}&location=${location}`)
        .then((response) => {
            // console.log(response)
            return response.json()
        }).then((jsonResponse) => {
            // console.log(jsonResponse)
            if (jsonResponse.businesses) {
                return jsonResponse.businesses.map((business) => {
                    return {
                        id: business.id,
                        imageSrc: business.image_url,
                        name: business.name,
                        address: business.location.address1,
                        city: business.location.city,
                        state: business.location.state,
                        zipCode: business.location.zip_code,
                        category: business.categories.title,
                        rating: business.rating,
                        reviewCount: business.review_count,
                    }
                })
            }
        })
    }
}

export default Yelp