/**
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
package com.qcadoo.mes.materialFlowResources.service;

import java.math.BigDecimal;
import java.util.List;

import com.qcadoo.mes.materialFlowResources.constants.WarehouseAlgorithm;
import com.qcadoo.model.api.Entity;

public interface ResourceManagementService {

    void createResourcesForReceiptDocuments(final Entity document);

    void updateResourcesForReleaseDocuments(final Entity document);

    void moveResourcesForTransferDocument(Entity document);

    List<Entity> getResourcesForWarehouseProductAndAlgorithm(Entity warehouse, Entity product, Entity position,
            WarehouseAlgorithm warehouseAlgorithm);

    BigDecimal convertToGivenUnit(BigDecimal quantity, Entity position);
}
