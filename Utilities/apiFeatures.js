class APIFeatures{
    constructor(query, qstring){
        this.query = query;
        this.qstring = qstring;
    }

    sort(){
        if (this.qstring.sort){
            const sortBy = this.qstring.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        }else{
            this.query = this.query.sort('DateCreate')
        }
        return this;
    }

    filter(){
        const qObject = {...this.qstring};
        const excludedFields = ['page','sort','limit', 'fields'];
        excludedFields.forEach(e => delete qObject[e]) 

        let qstring = JSON.stringify(qObject);
        qstring =qstring.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        this.query = this.query.find(JSON.parse(qstring));

        return this;
    }

    limitFields(){
        if (this.query.fields){
            const fields = this.query.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        }else{
            this.query = this.query.select('-___v');
        }

        return this;

    }

    paginate(){
        const page = this.qstring.page *1 || 1;
        const limit = this.qstring.limit * 1 || 5;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}

module.exports = APIFeatures