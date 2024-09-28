"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Init1726969231100 = void 0;
const typeorm_1 = require("typeorm");
class Init1726969231100 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'recipe',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                    isNullable: false,
                },
                {
                    name: 'description',
                    type: 'varchar',
                    isNullable: false,
                },
            ],
        }));
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'ingredient',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                    isNullable: false,
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'quantity',
                    type: 'integer',
                    isNullable: false,
                },
            ],
        }));
        await queryRunner.addColumn('ingredient', new typeorm_1.TableColumn({
            name: 'recipeId',
            type: 'uuid',
        }));
        await queryRunner.createForeignKey('ingredient', new typeorm_1.TableForeignKey({
            columnNames: ['recipeId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'recipe',
            onDelete: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable('ingredient');
        const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf('recipeId') !== -1);
        await queryRunner.dropForeignKey('ingredient', foreignKey);
        await queryRunner.dropColumn('ingredient', 'recipeId');
        await queryRunner.dropTable('ingredient');
        await queryRunner.dropTable('recipe');
    }
}
exports.Init1726969231100 = Init1726969231100;
//# sourceMappingURL=1726969231100-init.js.map