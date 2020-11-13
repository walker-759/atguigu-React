const mongoose = require('mongoose')
class Db {
    constructor(collModel) {
        this.collModel = collModel
    }
    connect() {
        return mongoose.connect("mongodb://127.0.0.1/ppobj", {
            // 使用最新的地址解析器
            useNewUrlParser: true,
            // 数据监听器
            useUnifiedTopology: true,
            // 使用人家的索引方式
            useCreateIndex: true
        })
    }
    // 根据条件查找  查找多条
    async find({whereObj={},skip=0,limit=0,sort={}}){
        await this.connect()
        return this.collModel.find(whereObj).skip(skip).limit(limit).sort(sort)
    }
    // 根据条件,查找一条记录
    async findOneRecord(whereObj={}){
        await this.connect()
        return this.collModel.findOne(whereObj);
    }
    // 插入一条记录
    async insert(insertObj={}){
        await this.connect()
        return this.collModel.create(insertObj)
    }

    // 根据条件查找文档总条数
    async count (whereObj={}){
        await this.connect()
        return this.collModel.countDocuments(whereObj)
    }

    // 根据条件进行修改
    // id  查找目标的id  人为的id
    // upObj  修改内容
    async updateOneById (id,upObj){
        await this.connect()
        return this.collModel.updateOne({id},upObj)
    }

    // 根据_id进行修改
    async updateOne (_id,upObj){
        await this.connect()
        return this.collModel.updateOne({_id},upObj)
    }

    // 根据_id删除一条记录
    async deleteOneById (_id){
        await this.connect()
        return this.collModel.deleteOne({
            _id
        })
    }
    // 根据映射id删除一条记录
    async deleteOneByys(id){
        await this.connect()
        return this.collModel.deleteOne({
            id
        })
    }

}
module.exports = Db