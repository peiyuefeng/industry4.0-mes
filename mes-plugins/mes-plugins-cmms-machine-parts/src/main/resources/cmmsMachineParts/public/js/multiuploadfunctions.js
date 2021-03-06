/*
 * ***************************************************************************
 * Copyright (c) 2018 RiceFish Limited
 * Project: SmartMES
 * Version: 1.6
 *
 * This file is part of SmartMES.
 *
 * SmartMES is Authorized software; you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation; either version 3 of the License,
 * or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty
 * of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 * ***************************************************************************
 */
$(function() {
	$('#fileupload')
			.fileupload(
					{
						
						dataType : 'json',
						acceptFileTypes : /(\.|\/)(gif|jpe?g|png|pdf|xls|xlsx|dwg|ipt|iam|idw|docx?|txt|csv|xml|odt|ods|tiff?)$/i,

						submit : function(e, data) {
							var locale = window.mainController
							.getComponentByReferenceName(
								"machinePartMultiUploadLocale")
									.getValue().content.value;
							var partId = window.mainController
								.getComponentByReferenceName(
									"machinePartIdForMultiUpload")
										.getValue();
							var partIdValue = partId.content;
							if(!partIdValue.value || 0 === partIdValue.value){
							    $.each(data.files, function (index, file) {
									if(locale === "zh_CN" || locale === "zh"){
							    	showMessage("失败",
											"机械零部件未保存",
											"省略文件上传: "
													+ file.name);
									} else {
								    	showMessage("failure",
												"Machine part is not saved",
												"Omitted file upload: "
														+ file.name);
									}
									});

								return false;
							}
						},
						done : function(e, data) {
							var gr = window.mainController
									.getComponentByReferenceName("form");
							gr.performRefresh;
							mainController.performRefresh;
							var mainViewComponent = mainController
									.getComponentByReferenceName("form")
									|| mainController
											.getComponentByReferenceName("grid");
							if (mainViewComponent) {
								mainViewComponent.performRefresh();
							}

							var locale = window.mainController
							.getComponentByReferenceName(
								"machinePartMultiUploadLocale")
									.getValue().content.value;
							var filetype = /(\.|\/)(gif|jpe?g|png|pdf|xls|xlsx|dwg|ipt|iam|idw|docx?|txt|csv|xml|odt|ods|tiff?)$/i;

							$.each(data.files, function(index, file) {
								if (filetype.test(file.name)) {
								if(locale === "zh_CN" || locale === "zh"){
									showMessage("成功", "上传已完成",
											"已加载文件: " + file.name);
								} else {
									showMessage("success", "Uploading completed",
											"Loaded a file: " + file.name);
								}
								}
							});
						},

						progressall : function(e, data) {
							var progress = parseInt(data.loaded / data.total
									* 100, 10);
							$('#progress .progress-bar').css('width',
									progress + '%');
						},
						dropZone : $('#dropzone')
					}).bind(
					'fileuploadsubmit',
					function(e, data) {
						var partId = window.mainController
								.getComponentByReferenceName(
										"machinePartIdForMultiUpload").getValue();
						var partIdValue = partId.content;
						data.formData = {
							partId : partIdValue.value
						};
					}).bind(
					'fileuploadadd',
					function(e, data) {
						var filetype = /(\.|\/)(gif|jpe?g|png|pdf|xls|xlsx|dwg|ipt|iam|idw|docx?|txt|csv|xml|odt|ods|tiff?)$/i;
						var locale = window.mainController
						.getComponentByReferenceName(
							"machinePartMultiUploadLocale")
								.getValue().content.value;
						$.each(data.files, function(index, file) {
							if (!filetype.test(file.name)) {
								if(locale === "zh_CN" || locale === "zh"){
								showMessage("失败",
										"省略文件上传",
										"无效文件类型: "
												+ file.name);
								} else {
									showMessage("failure",
											"Omitted file upload",
											"Invalid file type: "
													+ file.name);
								}
								return false;
							}

						});
					});

});

function showMessage(type, title, content) {
	mainController.showMessage({
		type : type,
		title : title,
		content : content
	});
}

