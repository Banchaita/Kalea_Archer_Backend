let Customer = require('../../model/Customer')
let Desinger = require('../../model/Designer')
let Category = require('../../model/Category')
let DesignerOrder = require ('../../model/DesignerOrder')




const dashboardUtils = {
    getDashboardCount: async () => {
        return new Promise(async (resolve, reject) => {
            let counts = {}
            let query = { status_on: { $ne: 2 } }
            let customer = await Customer.find(query, '-password');
            let designer = await Desinger.find(query, '-password');
            let category = await Category.find(query);
            let designerorder = await DesignerOrder.find(query);
            

            if (customer) {
                counts.customer_total = customer.length
            }
            if (designer) {
                counts.designer_total = designer.length
            }
            if (category) {
                counts.category_total = category.length
            }
            if (designerorder) {
                counts.designerorder_total = designerorder.length
            }

            return resolve(counts)

        })
    },

}

module.exports = { ...dashboardUtils }
