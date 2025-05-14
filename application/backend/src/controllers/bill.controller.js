// src/controllers/bill.controller.js

class BillController {
	constructor(billService) {
	  this.billService = billService;
	}
  
	async getAllBills(req, res, next) {
	  try {
		if (req.query.status) {
		  const bills = await this.billService.getBillsByStatus(req.query.status);
		  return res.status(200).json({ success: true, count: bills.length, bills });
		}
		
		if (req.query.user_id) { // Changed from guest_id
		  const bills = await this.billService.getBillsByUser(req.query.user_id); // Changed from getBillsByGuest
		  return res.status(200).json({ success: true, count: bills.length, bills });
		}
		
		if (req.query.stay_id) {
		  const bills = await this.billService.getBillsByStay(req.query.stay_id);
		  return res.status(200).json({ success: true, count: bills.length, bills });
		}
		
		const bills = await this.billService.getAllBillsWithDetails();
		res.status(200).json({ success: true, count: bills.length, bills });
	  } catch (error) {
		if (error.message.includes('Invalid status')) {
		  return res.status(400).json({ success: false, message: error.message });
		}
		next(error);
	  }
	}
  
	async getBill(req, res, next) {
	  try {
		const bill = await this.billService.getBillWithDetails(req.params.id);
		res.status(200).json({ success: true, bill });
	  } catch (error) {
		if (error.message === 'Bill not found') {
		  return res.status(404).json({ success: false, message: error.message });
		}
		next(error);
	  }
	}
  
	async createBill(req, res, next) {
	  try {
		const bill = await this.billService.createBill(req.body);
		res.status(201).json({ success: true, data: bill });
	  } catch (error) {
		const badRequestMessages = [
		  'required', 'Invalid status', 'Failed to calculate bill amount', 
		  'Stay not found', 'Please provide a total_amount', 'check pricing setup'
		];
		if (badRequestMessages.some(msg => error.message.includes(msg))) {
		  return res.status(400).json({ success: false, message: error.message });
		}
		next(error);
	  }
	}
  
	async updateBill(req, res, next) {
	  try {
		const bill = await this.billService.updateBill(req.params.id, req.body);
		res.status(200).json({ success: true, data: bill });
	  } catch (error) {
		if (error.message === 'Bill not found') {
		  return res.status(404).json({ success: false, message: error.message });
		}
		if (error.message.includes('Invalid status') || error.message.includes('Total amount')) {
		  return res.status(400).json({ success: false, message: error.message });
		}
		next(error);
	  }
	}
  
	async updateBillStatus(req, res, next) {
	  try {
		const { status } = req.body;
		if (!status) {
		  return res.status(400).json({ success: false, message: 'Please provide a status' });
		}
		const bill = await this.billService.updateBillStatus(req.params.id, status);
		res.status(200).json({ success: true, data: bill });
	  } catch (error) {
		if (error.message === 'Bill not found') {
		  return res.status(404).json({ success: false, message: error.message });
		}
		if (error.message.includes('Invalid status')) {
		  return res.status(400).json({ success: false, message: error.message });
		}
		next(error);
	  }
	}
  
	async processPayment(req, res, next) {
	  try {
		if (!req.body.amount || !req.body.payment_method) {
		  return res.status(400).json({ success: false, message: 'Payment amount and method are required' });
		}
		const bill = await this.billService.processPayment(req.params.id, req.body);
		res.status(200).json({ success: true, data: bill });
	  } catch (error) {
		if (error.message === 'Bill not found') {
		  return res.status(404).json({ success: false, message: error.message });
		}
		if (error.message.includes('Payment amount')) {
		  return res.status(400).json({ success: false, message: error.message });
		}
		next(error);
	  }
	}
  
	async checkOverdueBills(req, res, next) {
	  try {
		const overdueCount = await this.billService.checkOverdueBills();
		res.status(200).json({
		  success: true,
		  message: `Found ${overdueCount} overdue bills`,
		  data: { count: overdueCount }
		});
	  } catch (error) {
		next(error);
	  }
	}
  }
  
  module.exports = BillController;