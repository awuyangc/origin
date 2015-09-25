package com.wy.controller;



import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.qq.weixin.message.model.SNSUserInfo;
import com.qq.weixin.utils.HttpRequestUtil;
import com.wy.model.BaiduPoi;
import com.wy.model.InviteInfo;
import com.wy.model.JoinInfo;
import com.wy.service.IBaiduPoiService;
import com.wy.service.IInviteInfoService;
import com.wy.service.IJoinInfoService;
import com.wy.service.IWeixinUserService;
import com.wy.util.JsonPluginsUtil;

@Controller
@RequestMapping("/")
public class BaseController {
//*********************************************首页***********************************************
	@Resource
	private IInviteInfoService inviteInfoService;
	@Resource
	private IWeixinUserService weixinUserService;
	@Resource
	private IJoinInfoService joinInfoService;
	@Resource
	private IBaiduPoiService baiduPoiService;
	
	@RequestMapping("/index")
	public String toIndex(String page,String inviteId){
		return "index.html?page="+page+"&inviteId="+inviteId+"&rd="+Math.random();
	}
	
	
	@RequestMapping("/signUp")
	public String toSignUp(String inviteId){
		return "signUp.html?inviteId="+inviteId+"&rd="+Math.random();
	}
	
	@RequestMapping("/setVirtualSession")
	@ResponseBody
	public String  setVirtualSession(HttpSession session,SNSUserInfo snsUserInfo){
		snsUserInfo.setOpenId("ohgNjs8zYxx4utgRDuhydQvmKLAM");
		snsUserInfo.setNickname("五小羊");
		//snsUserInfo.setOpenId("ohgNjswHcgpLpEl6T1fe307027Vw");
		//snsUserInfo.setNickname("Leaves");
		//snsUserInfo.setOpenId("ohgNjsxgGyDQitK2cezkBXOf4pXQ");
		//snsUserInfo.setNickname("马于涛");			
		//设置session
		session.setAttribute("snsUserInfo", snsUserInfo);
		return "ok";
	}
	
	@RequestMapping("/getInviteInfo")
	@ResponseBody
	public InviteInfo getInviteInfo(Integer inviteId){
		InviteInfo inviteInfo=inviteInfoService.getInviteInfoById(inviteId);
		return inviteInfo;
	}
	
	@RequestMapping("/saveInviteInfo")
	@ResponseBody
	public InviteInfo saveInviteInfo(String id,String inviteOpenid,String inviteDay,String inviteBegin,String inviteEnd,String inviteAddress) throws ParseException{
		//inviteInfoService.insert(inviteInfo);
		InviteInfo inviteInfo=new InviteInfo();
		SimpleDateFormat sdfDay = new SimpleDateFormat("yyyy/MM/dd");
		SimpleDateFormat sdfTime=new SimpleDateFormat("HH:mm");
		Date format_inviteDay=sdfDay.parse(inviteDay);
		Date format_inviteBegin=sdfTime.parse(inviteBegin);
		Date format_inviteEnd=sdfTime.parse(inviteEnd);
		inviteInfo.setInviteOpenid(inviteOpenid);
		inviteInfo.setInviteDay(format_inviteDay);
		inviteInfo.setInviteBegin(format_inviteBegin);
		inviteInfo.setInviteEnd(format_inviteEnd);
		inviteInfo.setInviteAddress(inviteAddress);
		inviteInfo.setCreateTime(new Date());
		if(id!=""&&id!=null)
		{
			//修改
			inviteInfo.setId(Integer.parseInt(id));
			inviteInfoService.update(inviteInfo);
		}
		else
		{
			//新增
			inviteInfoService.insert(inviteInfo);
		}
		return inviteInfo;
	}
	
	
	@RequestMapping("/saveJoinInfo")
	@ResponseBody
	public String saveJoinInfo(int inviteId,HttpSession session) throws ParseException{
		//inviteInfoService.insert(inviteInfo);
		JoinInfo joinInfo=new JoinInfo();
		joinInfo.setInviteId(inviteId);
		SNSUserInfo snsUserInfo=(SNSUserInfo) session.getAttribute("snsUserInfo");
		if(snsUserInfo!=null)
		{
			joinInfo.setOpenId(snsUserInfo.getOpenId());
			joinInfo.setCreateTime(new Date());
			if(joinInfoService.checkMySignInfo(joinInfo)==null)
			{
			joinInfoService.insert(joinInfo);
			}
			return "ok";
		}
		else
		{
			return "error";
		}
	}
	
	@RequestMapping("/deleteJoinInfo")
	@ResponseBody
	public String deleteJoinInfo(int inviteId,HttpSession session) throws ParseException{
		JoinInfo joinInfo=new JoinInfo();
		joinInfo.setInviteId(inviteId);
		SNSUserInfo snsUserInfo=(SNSUserInfo) session.getAttribute("snsUserInfo");
		if(snsUserInfo!=null)
		{
		joinInfo.setOpenId(snsUserInfo.getOpenId());
		joinInfoService.deleteByInviteId(joinInfo);
		return "ok";
		}
		else
		{
			return "error";
		}
	}
	
	@RequestMapping("/getJoinInfo")
	@ResponseBody
	public List<JoinInfo> getJoinInfo(Integer inviteId){
		List<JoinInfo> joinInfoList=joinInfoService.getJoinInfoByInviteId(inviteId);
		return joinInfoList;
	}
	
	@RequestMapping("/getRInviteInfo")
	@ResponseBody
	public List<JoinInfo> getRInviteInfo(HttpSession session){
		SNSUserInfo snsUserInfo=(SNSUserInfo) session.getAttribute("snsUserInfo");
		if(snsUserInfo!=null)
		{
		List<JoinInfo> joinInfoList=joinInfoService.selectMySignInfo(snsUserInfo.getOpenId());
		return joinInfoList;
		}
		else
		{
			return null;
		}
	}
	
	@RequestMapping("/getSInviteInfo")
	@ResponseBody
	public List<InviteInfo> getSInviteInfo(HttpSession session){
		SNSUserInfo snsUserInfo=(SNSUserInfo) session.getAttribute("snsUserInfo");
		if(snsUserInfo!=null)
		{
		List<InviteInfo> inviteInfo=inviteInfoService.getMyInviteInfoList(snsUserInfo.getOpenId());
		return inviteInfo;
		}
		else
		{
			return null;
		}
	}
	
	@RequestMapping("/getBaiduPoi")
	@ResponseBody
	public String  getBaiduPoi(HttpSession session,String requestUrl){
		JSONObject jsonObject = HttpRequestUtil.httpRequest(requestUrl,"json");
		BaiduPoi baiduPoi=new BaiduPoi();
		//JSONArray baiduPoiArray=(JSONArray) jsonObject.get("results");
		Map poiMap=JsonPluginsUtil.parseJSON2Map(jsonObject.get("results").toString().replace('[',' ').replace(']', ' '));
		
		
		/*
		 for(int i=0;i<baiduPoiArray.size();i++)
		{
			JSONObject baiduPoiJson=(JSONObject) baiduPoiArray.get(i);
		} 
		 * BeanUtils.copyProperties(jsonObject.get("result"), baiduPoi);
		 while(it.hasNext())
		 {
			 String key = (String) it.next();
             String value = jsonObject.getString(key); //类型强转失败会异常 
		 }
		 */
		return "ok";
	}
	
}
